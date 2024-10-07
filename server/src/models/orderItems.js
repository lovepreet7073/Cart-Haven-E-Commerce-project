const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    size: [{
        type: String,

    }],
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses",
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
})

const OrderItem = mongoose.model("OrderItem", orderItemSchema)
module.exports = OrderItem;