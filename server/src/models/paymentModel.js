const mongoose = require('mongoose');

const paymentInformationSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',  // Reference to the Order model
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'],
        default: 'PENDING',
    },
    paymentMethod: {
        type: String,
        enum: ['CARD', 'PAYPAL', 'BANK_TRANSFER', 'CASH_ON_DELIVERY'],
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'USD',  // Set default currency, can be modified based on the use case
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const PaymentInformation = mongoose.model('PaymentInformation', paymentInformationSchema);

module.exports = PaymentInformation;
