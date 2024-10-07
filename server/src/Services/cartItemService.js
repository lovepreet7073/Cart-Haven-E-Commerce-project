const CartItems = require('../models/cartItemModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel')
const userService = require('../Services/userService')
const updateCartItem = async (userId, cartItemId, cartItemData) => {
    console.log(cartItemId, cartItemData); // Ensure these are logged properly

    try {
        const item = await CartItems.findById(cartItemId).populate('product');

        if (!item) {
            throw new Error(`cart item not found: ${cartItemId}`);
        }

        const user = await userService.findUserById(item.userId);
        if (!user) {
            throw new Error(`user not found: ${cartItemData.userId}`);
        }

        console.log(user._id, cartItemData.userId, "check");
        if (user._id.toString() === cartItemData.userId) {
            item.quantity = cartItemData.quantity;

            const price = Number(item.product.price);
            const discountedPrice = Number(item.product.discountedPrice);

            item.price = item.quantity * price;
            item.discountedPrice = item.quantity * discountedPrice;

            const updatedItem = await item.save();
            return updatedItem;
        } else {
            throw new Error("you can't update this cart item");
        }
    } catch (error) {
        console.error(error.message); // Log the error message
        throw new Error(error.message);
    }
};

const removeCartItem = async (userId, cartItemId) => {
    try {
        const cartItem = await findCartItemById(cartItemId);
        if (!cartItem) {
            throw new Error("Cart item not found");
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error(`User not found with id: ${userId}`);
        }

        // Check if the user is the owner of the cart item
        if (user._id.toString() !== cartItem.userId.toString()) {
            throw new Error("You can't remove another user's item");
        }

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found for the user");
        }

        // Remove the cart item from the cart's cartItems array
        cart.cartItems = cart.cartItems.filter(item => item.toString() !== cartItemId.toString());

        // Update total price and total items
        cart.totalPrice -= cartItem.price; // Assuming the cart item has a price field
        cart.totalItem = cart.cartItems.length; // Update total items

        // Save the updated cart
        await cart.save();

        // Remove the cart item from CartItems collection
        await CartItems.findByIdAndDelete(cartItemId);

        return { message: "Item removed successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
};



const findCartItemById = async (cartItemId) => {
    return await CartItems.findById(cartItemId);
};
 
module.exports = {
    updateCartItem, removeCartItem, findCartItemById
}