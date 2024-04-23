const express = require('express');
const router = express.Router();
router.use(express.json());
const {productsList,createCheckoutSession,storeSubscriptionDetails,checkoutWebhook} =require ("../../Controllers/subscriptionController");
const { businessProfileProtectRoute } = require('../../Middleware/authMiddleware');
router.get("/products-list",businessProfileProtectRoute, productsList);

router.post("/create-checkout",businessProfileProtectRoute,createCheckoutSession);
router.post("/store",businessProfileProtectRoute,storeSubscriptionDetails);
router.post("/webhook", checkoutWebhook);


module.exports = router;