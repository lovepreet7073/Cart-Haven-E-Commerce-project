import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Grid } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
const OrderDetails = () => {
    return (
        <div className='px-5 lg:px-20'>
            <div>
                <h1 className='font-bold text-xl py-7'>
                    Delivery Address
                </h1>
                <AddressCard />

            </div>
            <div className='py-20'>
                <OrderTracker activeStep={3} />
            </div>
            <Grid container className='space-y-5'>
                {[1, 1, 1, 1].map((item) =>
                    <Grid item container className='shadow-xl rounded-md p-5 border ' sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <Grid item xs={6}>
                            <div className='flex items-center  space-x-4'>
                                <img className='w-[5rem] h-[7rem] object-cover object-top '
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAPF4g83GKwpjYGahNDdXtooQPmEO7FNZRNQ&s' />
                                <div className='space-y-2 ml-5'>
                                    <p className='font-semibold'>
                                        wommen dreeses stylish
                                    </p>
                                    <p className='space-x-5 opacity-50 text-sm font-semibold'>
                                        <span>Color: black</span>

                                    </p>
                                    <p>
                                        Seller: lineria
                                    </p>
                                    <p>₹159</p>
                                </div>
                            </div>

                        </Grid>

                        <Grid item>
                            <Box sx={{ color: "#38a3a5" }}>
                                <StarBorderIcon sx={{ fontSize: "3rem" }} className='px-2 ' />
                                <span>
                                    Rate & Review Product
                                </span>
                            </Box>

                        </Grid>
                    </Grid>
                )}


            </Grid>
        </div>
    )
}

export default OrderDetails