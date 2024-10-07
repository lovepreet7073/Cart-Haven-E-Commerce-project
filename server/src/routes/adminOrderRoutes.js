const express = require('express')
const router = express.Router();

const adminController = require('../controllers/adminOrderController');
const { authenticate ,isAdmin} = require('../Middleware/authenticate');


router.get('/', authenticate,isAdmin, adminController.getAllOrders);
router.put('/:orderId/confirmed',authenticate,isAdmin,adminController.confirmOrders)
router.put('/:orderId/shiporder',authenticate,isAdmin,adminController.shipOrders)
router.put('/:orderId/deliverorder',authenticate,isAdmin,adminController.deliverOrders)
router.put('/:orderId/cancelorder',authenticate,isAdmin,adminController.cancelOrders)
router.put('/:orderId/deleteorder',authenticate,isAdmin,adminController.deleteOrders)

module.exports = router;