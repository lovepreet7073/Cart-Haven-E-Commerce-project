const CartItems = require('../models/cartItemModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel')


const createCart = async (user) => {
    try {
        const cart = new Cart({ user });
        const createdcart = await cart.save();
        return createdcart;
    } catch (error) {
        throw new Error(error.message);

    }

}

const findUserCart = async (userId) => {
    try {
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'cartItems',
            populate: {
                path: 'product' // Populate product field in cartItems
            }
        });

        if (!cart) {
            throw new Error("Cart not found.");
        }

        // Initialize totals
        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        // Calculate totals
        for (let cartItem of cart.cartItems) {
            totalPrice += cartItem.price * cartItem.quantity; // Multiply price by quantity
            totalDiscountedPrice += cartItem.discountedPrice * cartItem.quantity; // Multiply discounted price by quantity
            totalItem += cartItem.quantity; // Sum up quantities for totalItem
        }

        // Update cart totals
        cart.totalPrice = totalPrice;
        cart.totalDiscountedPrice = totalDiscountedPrice;
        cart.discount = totalPrice - totalDiscountedPrice;
        cart.totalItem = totalItem; // Set totalItem to the calculated total

        // Save the updated cart
        await cart.save(); // Ensure the cart totals are saved

        return cart;

    } catch (error) {
        throw new Error(error.message);
    }
};

const addCartItem = async (userId, req) => {
    try {
        if (!userId) {
            throw new Error("User ID is required.");
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, cartItems: [] });
            await cart.save();
        }

        const product = await Product.findById(req.productId);
        if (!product) {
            throw new Error("Product not found.");
        }

        const isPresent = await CartItems.findOne({ cart: cart._id, product: product._id, userId });
        if (!isPresent) {
            const cartItem = new CartItems({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                size: req?.size,
                discountedPrice: product.discountedPrice
            });

            await cartItem.save();

            if (!cart.cartItems) {
                cart.cartItems = [];
            }
            cart.cartItems.push(cartItem._id); // Ensure the ID is being pushed
            await cart.save();

            console.log("Cart after adding item:", cart); // Check cart state after save

            return cart; // Return the updated cart directly
        } else {
            return "Item already in cart";
        }
    } catch (error) {
        console.log(error, "error");
        throw new Error(error.message);
    }
};




module.exports = { createCart, findUserCart, addCartItem };