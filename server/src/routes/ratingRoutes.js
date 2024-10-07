const express = require('express')
const router = express.Router();

const ratingController  =require('../controllers/ratingController');
const { authenticate } = require('../Middleware/authenticate');

router.post('/create',authenticate,ratingController.createRating);
router.put('/product/productId',authenticate,ratingController.getALLRatings);
module.exports = router;