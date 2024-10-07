import { Grid2, Box, Avatar, Rating } from '@mui/material'
import React from 'react'

const ProductreviewCard = () => {
    return (
        <div>
            <Grid2 container spacing={2} gap={3}>
                <Grid2 item xs={1}>
                    <Box>
                        <Avatar className='text-white' sx={{ width: 56, height: 56, bgcolor: "#38a3a5" }}></Avatar>
                    </Box>
                </Grid2>

                <Grid2 item xs={9}>
                    <div className='space-y-2'>
                        <div>
                            <p className='font-semibold text-lg'>Ram</p>
                            <p className='opacity-70 '>November 26,2023</p>
                        </div>
                    </div>

                    <Rating value={4.5} name='half-rating' readOnly precision={.5} />
                    <p>Contrary to popular belief dhhsjg
                    </p>
                </Grid2>
            </Grid2>
        </div>
    )
}

export default ProductreviewCard