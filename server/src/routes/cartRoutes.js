const express = require('express')
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../Middleware/authenticate');

router.get('/', authenticate, cartController.findeUserCart)
router.put('/add', authenticate, cartController.addItemToCart)

module.exports = router;