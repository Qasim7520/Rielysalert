const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Joi = require("joi");
const Subscription = require("../Models/subscriptionModal");
const BusinessModal = require("../Models/businessProfileModal");

module.exports = {
    productsList : async (req, res) => {
        try {
          const productList = await stripe.products.list();
          const products = productList.data;
      
          const priceList = await stripe.prices.list();
          const prices = priceList.data;
      
          const priceMap = {};
          prices.forEach((price) => {
            priceMap[price.product] = {
              priceId: price.id,
              currency: price.currency,
              amount: price.unit_amount / 100, 
            };
          });
      
          const productsWithPrices = products.map((product) => {
            return {
              ...product,
              priceInfo: priceMap[product.id], 
            };
          });

          console.log("productsWithPrices",productsWithPrices)
      
          return res.status(200).json(productsWithPrices);
        } catch (error) {
          return res.status(500).json({ message: "Something went wrong." });
        }
      },
      createCheckoutSession : async (req, res) => {
        try {
          const schema = Joi.object({
            priceId: Joi.string().required(),
          });
          const data = {
            priceId: req.body.priceId,
          };
      
          const { error } = schema.validate(data, {
            errors: { label: "key", wrap: { label: false } },
            abortEarly: false,
          });
      
          if (error) {
            return res.status(422).json(errors);
          }
          var CHECKOUT_SESSION_ID;
      
          const session = await stripe.checkout.sessions.create({
            customer_email: req.user.email,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
              {
                price: req.body.priceId,
                quantity: 1,
              },
            ],
            success_url: `${process.env.FRONTEND_URL}/PaymentSuccess/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
          });
      
          return res.status(200).json({ checkoutUrl: session.url });
        } catch (error) {
            console.log('error',error)
          return res.status(500).json({ message: "Something went wrong." });
        }
      },
      storeSubscriptionDetails : async (req, res) => {
        const schema = Joi.object({
          checkoutSessionId: Joi.string().required(),
        });
        const data = {
          checkoutSessionId: req.body.checkoutSessionId,
        };
      
        const { error } = schema.validate(data, {
          errors: { label: "key", wrap: { label: false } },
          abortEarly: false,
        });
      
        if (error) {
          return res.status(422).json(error);
        }
        try {
          const session = await stripe.checkout.sessions.retrieve(
            req.body.checkoutSessionId
          );
          const subscriptionId = session.subscription;
      
          const retrieveSubscription = await stripe.subscriptions.retrieve(
            subscriptionId
          );
          const product = await stripe.products.retrieve(
            retrieveSubscription.plan.product
          );
          const susbcription = {
            userId: req.user.id,
            productTitle: product.name,
            subscriptionId: retrieveSubscription.id,
            priceId: retrieveSubscription.plan.id,
            amount: retrieveSubscription.plan.amount / 100,
            customerId: retrieveSubscription.customer,
            currency: retrieveSubscription.plan.currency,
            interval: retrieveSubscription.plan.interval,
            currentPeriodStart: new Date(
              retrieveSubscription.current_period_start * 1000
            ),
            currentPeriodEnd: new Date(
              retrieveSubscription.current_period_end * 1000
            ),
          };
          const query = { userId: req.user._id };
          await Subscription.findOneAndUpdate(query, susbcription, {
            upsert: true,
            new: true,
          });
          if (retrieveSubscription?.id) {
            const query = { _id: req.user._id}; 
            const update = { status: 'paid' }; 
            try {
              const updatedProfile = await BusinessModal.findOneAndUpdate(query, update, {
                upsert: true, 
                new: true, 
              });
              if (updatedProfile) {
                console.log('Business profile updated successfully:', updatedProfile);
              } else {
                console.log('Business profile not found.');
              }
            } catch (error) {
              console.error('Error updating business profile:', error);
              return res.status(500).json({ message: "Something went wrong." });
            }
          }
          
          return res
            .status(200)
            .json({ message: "Subscription record saved successfully." });
        } catch (error) {
            console.log('error',error)
          res.status(500).json({ message: "Something went wrong." });
        }
      },
      
      getCustomerCards : async (req, res) => {
        try {
          const userId = req.user._id;
      
          const subscription = await Subscription.findOne({ userId });
      
          if (!subscription) {
            return res.status(404).json({ error: "Subscription not found for the user" });
          }
      
          const customerId = subscription.customerId;
      
          const customer = await stripe.customers.retrieve(customerId, {
            expand: ['sources'], 
          });
      
          const cards = customer.sources.data.filter((source) => source.object === 'card');
          const cardDetails = cards.map((card) => ({
            cardId: card.id,
            brand: card.brand,
            last4: card.last4,
            expMonth: card.exp_month,
            expYear: card.exp_year,
          }));
      
          return res.status(200).json(cardDetails);
        } catch (error) {
          return res.status(500).json({ message: "Something went wrong." });
        }
      },
      
      checkoutWebhook : async (req, res) => {
        const sig = req.headers['stripe-signature'];
        const endpointSecret = 'your_stripe_webhook_secret';
      
        let event;
      
        try {
          event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
        } catch (err) {
          return res.status(400).json({ error: err.message });
        }
      
        if (event.type === 'checkout.session.completed') {
          const session = event.data.object;
          const customer_id = session.customer;
          const card_id = session.payment_method_details.card.id;
      
          try {
            const subscription = await Subscription.findOneAndUpdate(
              { customerId: customer_id },
              { cardId: card_id },
              { new: true, upsert: true }
            );
      
            console.log('Subscription record updated:', subscription);
          } catch (error) {
            console.error('Error updating subscription record:', error);
            return res.status(500).json({ error: 'Something went wrong.' });
          }
        }
      
        res.json({ received: true });
      },
}
