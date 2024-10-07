import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@mui/material';
import { api } from '../../../Config/apiConfig';
import { API_BASE_URL } from '../../../Config/apiConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Load Stripe
const stripePromise = loadStripe("pk_test_51Q5nEfP49DsSP07KWKXmHMAREpHUlfjBdKzdktXcNWktODod8lWH8SE5t8j8PuGjPMI077FPbudCpoqGatfbFt6a00vOauBROS");

const CheckoutForm = ({ orderId }) => {
  const { order } = useSelector((store) => store);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePayment = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const cardElement = elements.getElement(CardElement);

    const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (cardError) {
      setLoading(false);
      setError(cardError.message);
      return;
    }

    try {
      const res = await api.post(`${API_BASE_URL}/api/stripe/create-checkout-session`, {
        orderId,
        paymentMethodId: paymentMethod.id,
      });

      if (res.data && res.data.id) {
        setLoading(false);
        navigate('/success');
      }
    } catch (error) {
      setLoading(false);
      setError('Failed to create checkout session.');
    }
  };

  return (
    <form onSubmit={handlePayment} className="flex flex-col w-[30rem] h-full">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '20px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <Button
        type="submit"
        disabled={!stripe || loading}
        variant="contained"
        color="primary"
        sx={{ mt: 4, p: 2, fontSize: "17px" }}
      >
        {loading ? 'Processing...' : `Pay ₹${order?.order?.totalDiscountedPrice}`}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

const StripeCheckout = () => {
  const [orderId, setOrderId] = useState('');
  const location = useLocation();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const idFromParams = searchParams.get('order_id');

    setOrderId(location.state?.orderId || idFromParams);
  }, [location.state]);

  return (
    <div className="flex flex-col w-full items-center mt-[4%] mb-[3%] p-4">
      <div className='border rounded mt-2 p-4'>
        <h1 className='mb-3 text-3xl font-semibold pb-3'>Card</h1>
        <hr />
        <div className='mt-5'>
          <p className='uppercase font-bold opacity-60 text-lg'>Price Details</p>
          <div className='space-y-3 font-semibold mb-10'>
            <div className='flex justify-between pt-3'>
              <span>Price</span>
              <span>₹{order?.order?.totalPrice}</span>
            </div>
            <div className='flex justify-between pt-3'>
              <span>Discount</span>
              <span className='text-green-600'>-₹{order?.order?.discount}</span>
            </div>
            <div className='flex justify-between pt-3'>
              <span>Delivery Charge</span>
              <span className='text-green-600'>Free</span>
            </div>
            <div className='flex justify-between pt-3 font-bold'>
              <span>Total Amount</span>
              <span className='text-green-600'>₹{order?.order?.totalDiscountedPrice}</span>
            </div>
          </div>
        </div>
        <hr />
        <div className='mt-3'>
          <Elements stripe={stripePromise}>
            <CheckoutForm orderId={orderId} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default StripeCheckout;
