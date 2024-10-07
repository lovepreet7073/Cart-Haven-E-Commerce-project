const express = require('express')
const router = express.Router();
const {authenticate} = require('../Middleware/authenticate')
const stripeController = require('../controllers/StripeController')
router.post('/create-checkout-session',authenticate, stripeController.PaymentStripe)

module.exports = router