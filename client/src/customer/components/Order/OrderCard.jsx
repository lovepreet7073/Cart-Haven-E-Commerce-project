import { Grid } from '@mui/material';
import React from 'react';

const OrderCard = ({ orderStatus, subtotal, totalItems, shippingAddress, orderItems,orderNumber,paymentDetails }) => {
    return (
        <div className='p-6 shadow-lg border border-neutral-100 w-full md:w-[50rem]'>
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Order #{orderNumber}</h1>
                <p className={`text-lg font-semibold ${orderStatus === 'PENDING' ? 'text-red-500' : 'text-green-500'}`}>
                    <span className='font-md text-black'> Order Status: </span>   {orderStatus}
                </p>
            </div>

            {/* Iterate over Order Items */}
            {orderItems.map((product, index) => (
                <div className=' mt-3'>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={2}>
                            <img
                                className='w-[6rem] h-[6rem] object-cover'
                                src={product.product?.imageUrl || 'https://via.placeholder.com/100'}
                                alt={product.product?.title || 'Product Image'}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <h2 className='text-xl font-md opacity-100'>{product.product?.title || 'Product Name'}</h2>
                            <p className='text-sm opacity-70'>{product.product?.brand || 'Brand'}</p>
                            <p className='text-sm opacity-70 mt-5'>Qty: {product.quantity}</p>
                        </Grid>
                        <Grid item xs={1}>
                            <p className="text-lg font-semibold">₹{product.discountedPrice || product.price}</p>
                        </Grid>
                    </Grid>
                </div>

            ))}

            <hr className="my-4" />

            {/* Subtotal and Items */}
            <div className="flex justify-between">
                <div>
                    <p>Subtotal</p>
                </div>
                <div>
                    <p>₹{subtotal}</p>
                </div>
            </div>
            <div className="flex justify-between">
                <div>
                    <p>Total Items</p>
                </div>
                <div>
                    <p>{totalItems} </p>
                </div>
            </div>



            <h3 className="text-xl mt-4 mb-3 font-bold">Shipping Address</h3>
            <div className="flex justify-between border p-4 mt-2">
                <div>
                    <p className="font-bold">{shippingAddress?.firstName} {shippingAddress?.lastName}</p>
                    <p>{shippingAddress?.street}</p>
                    <p>{shippingAddress?.city}, {shippingAddress?.zipCode}</p>
                </div>
                <div className="text-right">
                    <p>Phone: {shippingAddress?.mobile}</p>
                    <p>{shippingAddress?.state}</p>
                </div>
            </div>
            <h4 className="text-xl mt-4 mb-3 font-semibold">Payment Details</h4>
            <div className="flex justify-between border p-4 mt-2">
                <div>
                    <p>Payment method: {" "}{paymentDetails?.paymentMethod} </p>
                    <p>Payment status: {"   "}
                        <span className={`text-md font-semibold ${paymentDetails?.paymentStatus === 'PENDING' ? 'text-red-500' : 'text-green-500'}`}>{paymentDetails?.paymentStatus} </span></p>
                </div>
             
            </div>
        </div>
    );
};

export default OrderCard;
