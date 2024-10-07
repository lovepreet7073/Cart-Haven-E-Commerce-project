const Order = require('../models/orderModel')
const cartService = require('./cartService')
const Address = require('../models/addressModel')
const OrderItem = require('../models/orderItems')

const createOrder = async (user, shipAddress) => {
    let address;

    try {
        
        if (shipAddress._id) {
            let existingAddress = await Address.findById(shipAddress._id);
            address = existingAddress;
        } else {
            address = new Address(shipAddress);
            address.user = user._id; // Only store user ID in the address
            await address.save();

            // Update user's address array
            user.address.push(address._id); // Push only the address ID
            await user.save();
        }

        // Find the user's cart
        const cart = await cartService.findUserCart(user._id);
        const orderItems = [];

        // Loop through cart items and create order items
        for (const item of cart.cartItems) {
            // Calculate totalPrice per item
            const totalPrice = item.price * item.quantity;

            const orderItem = new OrderItem({
                price: item.price,
                product: item.product,
                quantity: item.quantity,
                size: item.size,
                userId: user._id, // Use user's ID
                discountedPrice: item.discountedPrice,
                totalPrice // Add the calculated totalPrice
            });

            // Save the order item and push it to the array
            const createdOrderItem = await orderItem.save();
            orderItems.push(createdOrderItem._id); // Push only the order item ID
        }

        // Create the order with the user's ID, address ID, and order item IDs
        const createdOrder = new Order({
            user: user._id, // Save only the user ID
            orderItems, // Order items are referenced by their IDs
            totalPrice: cart.totalPrice, // Already calculated for the entire order
            totalDiscountedPrice: cart.totalDiscountedPrice,
            discount: cart.discount,
            totalItem: cart.totalItem,
            shippingAddress: address._id, // Save only the address ID
        });

        // Save the order and return it
        const savedOrder = await createdOrder.save();
        return savedOrder;
    } catch (error) {
        console.log(error, "error")
        throw new Error(error.message);
    }
};


const placeOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED";
    return await order.save();

}
const confirmedOdrer = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "CONFIRMED";
    return await order.save();

}
const shipOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "SHIPPED";
    return await order.save();

}
const deliverOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "DELIVERED";
    return await order.save();

}
const cancelOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "CANCELLED";
    return await order.save();

}
const findOrderById = async (orderId) => {
    const order = await Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress")
    return order;
}
const userOrderHistory = async (userId) => {
    try {
        const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "orderItems", populate: { path: "product" } }.lean());
        return orders
    } catch (error) {
        throw new Error(error.message);
    }
}
const getAllOrders = async (page, limit) => {
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const orders = await Order.find()
        .populate({
            path: "orderItems",
            populate: { path: "product", populate: { path: "category" } }
        })
        .skip(skip) // Skip the specified number of documents
        .limit(limit) // Limit the number of documents returned
        .lean();

    const totalOrders = await Order.countDocuments(); // Get total count of orders

    return {
        orders,
        totalOrders,
        totalPages: Math.ceil(totalOrders / limit), // Calculate total pages
        currentPage: page // Current page
    };
}

const deleteOrder = async (orderId) => {
    const order = await findOrderById(orderId)
    return Order.findByIdAndDelete(order._id)
}

const findOrdersByUserIdFunction = async (userId) => {
  
    const orders = await Order.find({ user: userId })
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress");
        console.log(orders,"orders")
    return orders;
}


module.exports = {
    placeOrder, createOrder, confirmedOdrer, shipOrder, deliverOrder, cancelOrder, findOrderById, userOrderHistory,
    getAllOrders, deleteOrder,findOrdersByUserIdFunction
}