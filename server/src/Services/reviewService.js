const Review = require('../models/reviewModel');
const productService = require('./productService')

const createreview = async (reqdata, user) => {
    try {

        const product = await productService.findProductById(reqdata.productId);
        const review = new Review({
            product: product._id,
            user: user._id,
            review: reqdata.review,
            createdAt: new Date()
        });
        await product.save();
        return await review.save();
    } catch (error) {
        throw new Error(error.message);
    }

}


const getAllReviews = async (productId) => {
    return await Review.find({ product: productId }).populate("user");
}

module.exports = {
    createreview,
    getAllReviews
}