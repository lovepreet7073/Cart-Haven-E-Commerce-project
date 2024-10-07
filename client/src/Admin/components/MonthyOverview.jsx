import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DevicesIcon from '@mui/icons-material/Devices';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, CardContent, Box, Typography, Avatar, Grid, CardHeader, IconButton } from '@mui/material';
const sales = [
    {
        stats: '245k',
        title: "Sales",
        color: "#EC4849",
        icon: <TrendingUpIcon sx={{ fontSize: "2.2rem" }} />
    },
    {
        stats: '12.4k',
        title: "Customers",
        color: "#2475B0",
        icon: <AccountBoxIcon sx={{ fontSize: "2.2rem" }} />
    },
    {
        stats: '1.54k',
        title: "Products",
        color: "#019031",
        icon: <DevicesIcon sx={{ fontSize: "2.2rem" }} />
    },
    {
        stats: '$88k',
        title: "Revenue",
        color: "#E1DA00",
        icon: <AttachMoneyIcon sx={{ fontSize: "2.2rem" }} />
    },
];
const renderStats = () => {
    return sales.map((item, index) => (
        <Grid item xs={12} sm={3} key={index}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar variant='rounded' sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    boxShadow: 3,
                    color: "white",
                    backgroundColor: `${item.color}`
                }}>
                    {item.icon}

                </Avatar>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column"

                }}>

                    <Typography variant='caption'>{item.title}</Typography>
                    <Typography variant='h6'>{item.stats}</Typography>
                </Box>
            </Box>
        </Grid>
    ))
}
const MonthyOverview = () => {


    return (
        <Card sx={{
             p: ".2rem"
        }}>
            <CardHeader title='Monthly Overview'
                action={
                    <IconButton size='small'>
                        <MoreVertIcon />
                    </IconButton>
                }
                subheader={
                    <Typography variant='body2'>
                        <Box component="span" sx={{
                            fontWeight: 600,
                            mx: 1

                        }}>
                            Total 49.5% growth
                        </Box>
                        😎 this month
                    </Typography>
                }
                titleTypographyProps={{
                    sx: {
                        mb: 2.5,
                        lineHeight: '2rem !important',
                        letterSpacing: '.15px !important'
                    }
                }}

            />
            <CardContent sx={{
                pt: theme => `${theme.spacing(3)} !important
            }`
            }}>
                <Grid container spacing={[5, 0]}>
                    {renderStats()}

                </Grid>

            </CardContent>


        </Card>
    );
};

export default MonthyOverview;
