const cartItemService = require('../Services/cartItemService');

const updateCartItem = async (req, res) => {
    const cartItemId = req.params.id; 
    const user = req.user;
    try {
        const updatedCartItem = await cartItemService.updateCartItem(user._id, cartItemId, req.body)
        return res.status(200).send(updatedCartItem)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

const removeCartItem = async (req, res) => {
    const user = await req.user;
    console.log(user,"user-remove-conroler")
    try {
        await cartItemService.removeCartItem(user._id, req.params.id,)
    console.log(user._id, req.params.id, "remove");

        return res.status(200).send({message:"cart item removed successfully"})
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

module.exports = {
    updateCartItem,
    removeCartItem
}