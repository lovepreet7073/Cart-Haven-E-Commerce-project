import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center h-[32rem] '>
    <div className=" flex flex-col items-center justify-center  bg-gray-50 p-3 border">
      <CheckCircle className="text-green-500" style={{ fontSize: 80 }} />
      <Typography variant="h4" className="mt-4 text-gray-800">
        Payment Successful
      </Typography>
      <Typography variant="body1" className="mt-2 text-gray-600 text-center">
        Thank you for your purchase. Your payment has been processed successfully.
      </Typography>
      <Button
                   sx={{ mt: 2, bgcolor: "#38a3a5", py: 1.5 }}
        variant="contained"
        color="primary"
        className="mt-6"
        onClick={() => {
   navigate('/account/order')
        }}
      >
        View Order Details
      </Button>
    </div>
    </div>
  );
};

export default Success;
