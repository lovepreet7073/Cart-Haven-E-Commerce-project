const ReviewService = require('../Services/reviewService')


const createReview = async (req, res) => {
    const user = req.user;
    try {
        const review = await ReviewService.createreview(req.body, user)
        return res.status(201).send(review)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}
const getAllReviews = async (req, res) => {
    const productId = req.params.productId;
    const user = req.user;
    try {
        const review = await ReviewService.getAllReviews(productId)
        return res.status(201).send(review)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

module.exports = {
    createReview,
    getAllReviews
}