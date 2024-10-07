import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import CartItem from '../Cart/CartItem'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../../Redux/Order/Actions'
import { useLocation, useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js';
import { api, API_BASE_URL } from '../../../Config/apiConfig'
const OrderSummary = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchparams = new URLSearchParams(location.search);
    const navigate = useNavigate()
    const orderId = searchparams.get("order_id")
    const { order } = useSelector(store => store)
    console.log(order, "order-page")
    useEffect(() => {
        dispatch(getOrderById(orderId))
    }, [orderId])
    console.log(order)






    //payment integration

    const handlepayment = async () => {
        console.log(orderId, "orderId")
        const stripe = await loadStripe("pk_test_51Q5nEfP49DsSP07KWKXmHMAREpHUlfjBdKzdktXcNWktODod8lWH8SE5t8j8PuGjPMI077FPbudCpoqGatfbFt6a00vOauBROS");

        try {

            const res = await api.post(`${API_BASE_URL}/api/stripe/create-checkout-session`, { orderId });

            if (res.data && res.data.id) {
                // Redirect to Stripe Checkout page      
                const result = await stripe.redirectToCheckout({
                    sessionId: res.data.id,
                });

                if (result.error) {
                    console.error(result.error.message);
                }
            }
        } catch (error) {
            console.error("Error while creating Stripe session:", error);
        }
    };

    const handleCheckout = () => {
        if (orderId) {
            navigate('/stripe-checkout', { state: { orderId } });
        } else {
            console.error('Order ID is not available');
        }
    };

    return (
        <div>
            <div className='p-5  rounded-md  mt-7'>

                <AddressCard
                    address={order?.order?.shippingAddress}
                    showRadio={false} // Do not show radio button in order summary
                />
            </div>


            <div>
                <div className='lg:grid grid-cols-3  relative'>
                    <div className='col-span-2'>
                        {order.order?.orderItems?.map((item) => <CartItem item={item} />)}
                    </div>
                    <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                        <div className='border p-6 mt-8 rounded-md'>
                            <p className='uppercase font-bold opacity-60 pb-4'>
                                Price Details
                            </p>
                            <hr />
                            <div className='space-y-3 font-semibold mb-10'>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>
                                        Price
                                    </span>
                                    <span>
                                        ₹{order.order?.totalPrice}
                                    </span>
                                </div>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>
                                        Discount
                                    </span>
                                    <span className='text-green-600'>
                                        -₹{order.order?.discount}
                                    </span>
                                </div>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>
                                        Delivery Charge
                                    </span>
                                    <span className='text-green-600'>
                                        -Free
                                    </span>
                                </div>
                                <div className='flex justify-between pt-3 text-black font-bold'>
                                    <span >
                                        Total Amount
                                    </span>
                                    <span className='text-green-600'>
                                        {order?.order?.totalDiscountedPrice}
                                    </span>
                                </div>
                            </div>
                            <Button onClick={handleCheckout} className='w-full '
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
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default OrderSummary