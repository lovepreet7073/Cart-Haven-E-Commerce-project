const cartService = require('../Services/cartService');

const findeUserCart = async(req,res)=>{
    const user  = await req.user;
    try {
        const cart = await cartService.findUserCart(user._id)
        return res.status(200).send(cart);
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}


const addItemToCart = async(req,res)=>{
    const user = await req.user;
    try {
        const cartItem = await cartService.addCartItem(user._id,req.body)
        return res.status(200).send(cartItem);
    } catch (error) {
        console.log(error,"error")
        return res.status(400).send({ error: error.message })
    }
}

module.exports= {
    addItemToCart,
    findeUserCart
}
