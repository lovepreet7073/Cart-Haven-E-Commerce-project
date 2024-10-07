const stripe = require('stripe')('sk_test_51Q5nEfP49DsSP07KB3DrsPomYktyU7QtJCOlqKzJr8oOVSRVQla6LkSk4yHiwHiwRgAMcTqDtuJcM7fE1aT1JlLi00OphnqkFr');
const Order = require('../models/orderModel');

const PaymentStripe = async (req, res) => {
    const { orderId } = req.body;

    try {

        const order = await Order.findById(orderId)
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                }
            });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Create a new Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: order?.orderItems?.map(item => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.product.title,
                    },
                    unit_amount: Math.round(item.discountedPrice * 100), // Convert to cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `http://localhost:5173/success`,
            cancel_url: `http://localhost:5173/cart`,
        });

        // Update the order with payment details (you can also do this after payment confirmation)
        order.paymentDetails = {
            paymentMethod: 'Card',
            transactionId: session.id, // This can be used to identify the payment in Stripe
            paymentId: null, // Can be used to store any payment-specific IDs if needed
            paymentStatus: 'COMPLETED', // Set it to completed after successful payment
        };
        order.orderStatus = 'CONFIRMED'; // Update the order status if necessary
        await order.save(); // Save the updated order details

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    PaymentStripe
};
