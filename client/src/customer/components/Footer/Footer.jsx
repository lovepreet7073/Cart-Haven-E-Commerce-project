import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <div>
            <Grid container sx={{ bgcolor: "black", color: "white", py: 3, textAlign: "center" }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography className='pb-5' variant='h6' gutterBottom>Company</Typography>
                    <div><Button className='pb-5' variant='h6' gutterBottom >About</Button></div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Blog</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Jobs</Button>

                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Press</Button>

                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Partners</Button>

                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Typography className='pb-5' variant='h6' gutterBottom>Solutions</Typography>
                    <div><Button className='pb-5' variant='h6' gutterBottom >Marketing</Button></div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Analytics</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Commerce</Button>

                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Insights</Button>

                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Support</Button>

                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Typography className='pb-5' variant='h6' gutterBottom>Documentation</Typography>
                    <div><Button className='pb-5' variant='h6' gutterBottom >Guides</Button></div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >API Status</Button>
                    </div>

                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Typography className='pb-5' variant='h6' gutterBottom>Legal</Typography>
                    <div><Button className='pb-5' variant='h6' gutterBottom >Claim</Button></div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Privacy</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Terms</Button>

                    </div>

                </Grid>

                <Grid className='pt-20' item xs={12}>
                   
                    <Typography variant='body2' sx={{ bgcolor: 'black', color: 'white', py: 2, textAlign: 'center' }}>
                        © {new Date().getFullYear()} CartHaven. All rights reserved.<br />
                        Address: 1234 abc Street, City, Country<br />
                        Contact: info@CartHaven.com | +123 456 7890
                    </Typography>

                </Grid>
            </Grid>
        </div>
    );
}

export default Footer;
