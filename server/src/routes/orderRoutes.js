const express = require('express')
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate } = require('../Middleware/authenticate');

router.post('/',authenticate,orderController.createOrder)
router.get('/user',authenticate,orderController.orderHistoryUser)
router.get('/user-orders',authenticate,orderController.findOrdersByUserId)
router.get('/:id',authenticate,orderController.findOrderById)

module.exports = router;