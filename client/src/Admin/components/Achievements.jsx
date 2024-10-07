import { Button, Card, CardContent, styled, Typography } from '@mui/material'
import React from 'react'
import trophy from '../../../assets/trophy.png'
const Achievements = () => {
    const TrianleImg = styled("img")({
        right: 0,
        bottom: 0,
        height: 170,
        position: "absolute"
    })
    const ImgTrphy = styled("img")({
        right: 36,
        bottom: 20,
        height: 98,
        position: "absolute"
    })
    return (
        <Card sx={{ position: "relative"}} className=''>
            <CardContent >
                <Typography variant='h6' sx={{ letterSpacing: ".25px" }}>
                    Shop with Carthaven
                </Typography>
                <Typography variant='body2'>
                    Congratulations🥳
                </Typography>
                <Typography variant='h5' sx={{ my: 3.1 }}>
                    420.8k
                </Typography>
                <Button variant="contained">View Sales</Button>
                <TrianleImg src=''>

                </TrianleImg>
                <ImgTrphy src={trophy}>

                </ImgTrphy>
            </CardContent>
        </Card>
    )
}

export default Achievements