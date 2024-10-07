const OrderService = require('../Services/orderService');

const getAllOrders = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the current page, default to 1
    const limit = parseInt(req.query.limit) || 10; // Get the limit, default to 10

    try {
        const orders = await OrderService.getAllOrders(page, limit);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}


const confirmOrders = async (req, res) => {

    const orderId = req.params.orderId;
    try {
        const orders = await OrderService.confirmedOdrer(orderId);
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

const shipOrders = async (req, res) => {

    const orderId = req.params.orderId;
    try {
        const orders = await OrderService.shipOrder(orderId);
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

const deliverOrders = async (req, res) => {

    const orderId = req.params.orderId;
    try {
        const orders = await OrderService.deliverOrder(orderId);
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}


const cancelOrders = async (req, res) => {

    const orderId = req.params.orderId;
    try {
        const orders = await OrderService.cancelOrder(orderId);
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

const deleteOrders = async (req, res) => {

    const orderId = req.params.orderId;
    try {
        const orders = await OrderService.deleteOrder(orderId);
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

module.exports = {
    confirmOrders,
    getAllOrders,
    shipOrders,
    cancelOrders,
    deleteOrders,
    deliverOrders
}