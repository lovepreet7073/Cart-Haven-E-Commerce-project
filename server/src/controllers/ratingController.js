const ratingService = require('../Services/ratingService')


const createRating = async (req, res) => {
    const user = req.user;
    try {
        const review = await ratingService.createRating(req.body, user)
        return res.status(201).send(review)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}
const getALLRatings = async (req, res) => {
    const productId = req.params.productId;
    const user = req.user;
    try {
        const review = await ratingService.getProductRating(productId)
        return res.status(201).send(review)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

module.exports = {
    createRating,
    getALLRatings
}