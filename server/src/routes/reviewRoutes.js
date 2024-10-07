const express = require('express')
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticate } = require('../Middleware/authenticate');

router.post('/',authenticate,reviewController.createReview)
router.get('/product/:productId',authenticate,reviewController.getAllReviews)

module.exports = router;