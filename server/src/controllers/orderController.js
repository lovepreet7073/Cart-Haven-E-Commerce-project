const OrderService = require('../Services/orderService');


const createOrder = async (req, res) => {
    const user = await req.user;
    try {
        const Order = await OrderService.createOrder(user, req.body);
        res.status(200).send(Order)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

const findOrderById = async (req, res) => {
    const user = req.user;
    try {
        const Order = await OrderService.findOrderById(req.params.id);
        res.status(200).send(Order)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}
const findOrdersByUserId = async (req, res) => {
    const user = await req.user;
    console.log(user._id, "user")
    try {
        const orders = await OrderService.findOrdersByUserIdFunction(user?._id);
        console.log(orders, "orders") // Use the user ID to fetch orders
        res.status(200).send(orders);
    } catch (error) {
        console.log(error, "error")
        res.status(400).send({ error: error.message });
    }
}

const orderHistoryUser = async (req, res) => {
    const user = req.user; S
    try {
        const Order = await OrderService.userOrderHistory(user.id);
        res.status(200).send(Order)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}
module.exports = {
    createOrder,
    findOrderById,
    orderHistoryUser, findOrdersByUserId
}