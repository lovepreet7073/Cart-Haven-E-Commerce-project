const express = require('express')
const router = express.Router();
const cartItemController = require('../controllers/cartItemController');
const { authenticate } = require('../Middleware/authenticate');

router.put('/:id',authenticate,cartItemController.updateCartItem)
router.delete('/:id',authenticate,cartItemController.removeCartItem);
module.exports = router;