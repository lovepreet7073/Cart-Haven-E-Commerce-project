import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../Redux/Cart/Actions';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwt"); // Check for authentication token
    const { cart } = useSelector(store => store);

    const handleCheckOut = () => {
        if (!token) {
            navigate('/login'); // Redirect to login if not authenticated
        } else {
            navigate('/checkout?step=1');
        }
    };

    useEffect(() => {
        dispatch(getCart());
    }, [cart.updatecartitem, cart.deleteCartItem]);

    return (
        <div>
            <div className='lg:grid grid-cols-3 lg:px-16 relative'>
                <div className='col-span-2'>
                    {cart?.cartItems?.length > 0 ? (
                        cart?.cartItems?.map((item) => <CartItem key={item?._id} item={item} />)
                    ) : (
                        <div className='text-center mt-10'>
                            <h2 className='text-lg font-semibold'>Your Cart is Empty</h2>
                            <p className='text-gray-500'>Add items to your cart to see them here.</p>
                        </div>
                    )}
                </div>
                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                    <div className='border p-6 mt-8 rounded-md'>
                        <p className='uppercase font-bold opacity-60 pb-4'>
                            Price Details
                        </p>
                        <hr />
                        <div className='space-y-3 font-semibold mb-10'>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Price</span>
                                <span>₹{cart?.cart?.totalPrice || 0}</span>
                            </div>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Discount</span>
                                <span className='text-green-600'>-₹{cart?.cart?.discount || 0}</span>
                            </div>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Delivery Charge</span>
                                <span className='text-green-600'>-Free</span>
                            </div>
                            <div className='flex justify-between pt-3 text-black font-bold'>
                                <span>Total Amount</span>
                                <span className='text-green-600'>₹{cart?.cart?.totalDiscountedPrice || 0}</span>
                            </div>
                        </div>

                        {!token ? (
                            <div className='text-center mt-4'>
                                <p className='text-red-500'>
                                    Please Login or Register  to add items to your cart or proceed to checkout.
                                </p>
                            </div>
                        ) : (
                            <Button
                                className='w-full'
                                type='submit'
                                onClick={handleCheckOut}
                                variant="contained"
                                sx={{
                                    px: "2.5rem",
                                    bgcolor: "#38a3a5",
                                    py: ".7rem",
                                    mt: "1rem",
                                    '&:hover': {
                                        bgcolor: "#57b5b6",
                                    },
                                }}
                                disabled={cart?.cartItems?.length === 0} // Disable button if cart is empty
                            >
                                Checkout
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
