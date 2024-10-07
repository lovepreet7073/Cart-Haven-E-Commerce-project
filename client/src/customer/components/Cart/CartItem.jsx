import { Button, IconButton } from '@mui/material';
import React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../../Redux/Cart/Actions';

const CartItem = ({ item }) => {
    console.log(item, "itemmm")
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);

    if (!item) {
        return <div className='p-5 text-center'>No item found in the cart.</div>;
    }


    const queryParams = new URLSearchParams(window.location.search);
    const orderId = queryParams.get('order_id');


    const isOrderPage = orderId !== null;

    const handleUpdateCartItem = (num) => {
        const reqData = {
            cartItemId: item?._id, // Ensure this is not undefined
            quantity: item?.quantity + num,
            userId: auth?.user?._id,
        };
        dispatch(updateCartItem(reqData));
    };

    const handleRemoveItem = () => {
        const reqData = {
            cartItemId: item?._id,
            userId: auth?.user?._id,
        };
        console.log(reqData, "Request Data");
        dispatch(removeCartItem(reqData));
    };

    return (
        <div className='p-5 shadow-lg border rounded-md mt-8'>
            <div className='flex items-center'>
                <div className='w-[9rem] h-[10rem] lg:h-[9rem]'>
                    <img
                        className='w-full h-full object-cover object-top'
                        src={item?.product?.imageUrl}
                        alt={item?.product?.title}
                    />
                </div>
                <div className='ml-5 space-y-1'>
                    <p className='font-semibold'>{item?.product?.title}</p>
                    <p className='opacity-70'>
                        {/* Display size if not empty, else display color */}
                        {item?.size ? `Size: ${item?.size}, ${item?.product?.color}` : `Color: ${item?.product?.color}`}
                    </p>
                    <p className='opacity-70 mt-2'>Seller: {item?.product?.brand}</p>
                    <div className='flex items-center text-lg space-x-5 text-gray-900 pt-6'>
                        <p className='font-semibold'>₹{item?.discountedPrice}</p>
                        <p className='opacity-50 line-through'>₹{item?.price}</p>
                        <p className='text-green-600 font-semibold'>
                            {item?.product?.discountedPercent}% off
                        </p>
                    </div>
                </div>
            </div>
            <div className='lg:flex items-center lg:space-x-10 pt-4'>
                <div className='flex items-center space-x-2'>
                    {/* Show update buttons only if not on the order page */}
                    {!isOrderPage && (
                        <>
                            <IconButton
                                sx={{ color: '#38a3a5' }}
                                onClick={() => handleUpdateCartItem(-1)}
                                disabled={item.quantity <= 1}
                            >
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <span className='py-1 px-7 border rounded-sm'>{item?.quantity}</span>
                            <IconButton
                                sx={{ color: '#38a3a5' }}
                                onClick={() => handleUpdateCartItem(1)}
                            >
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </>
                    )}
                </div>
                {/* Show remove button only if not on the order page */}
                {!isOrderPage && (
                    <div>
                        <Button sx={{ color: '#38a3a5' }} onClick={handleRemoveItem}>
                            Remove
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartItem;
