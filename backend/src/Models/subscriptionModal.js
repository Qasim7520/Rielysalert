const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var SubscriptionSchemaObject = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productTitle: {
    type: String,
  },
  subscriptionId: {
    type: String,
  },
  priceId: {
    type: String,
  },
  amount: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
  },
  customerId: {
    type: String,
  },
  interval: {
    type: String,
  },
  subscriptionStatus: {
    type: String,
    required: true,
  },
  currentPeriodStart: {
    type: Date,
  },
  cardId: {
    type: String,
  },
  currentPeriodEnd: {
    type: Date,
  },

};

const SubscriptionSchema = new Schema(SubscriptionSchemaObject, {
  timestamps: true,
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);

