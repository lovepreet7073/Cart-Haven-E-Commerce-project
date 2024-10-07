import { Grid } from '@mui/material'
import React from 'react'
import Achievements from './Achievements'
import MonthyOverview from './MonthyOverview'
import { useEffect } from 'react'
import ViewOrdertable from './View/View'
import ViewProducts from './View/Viewproducts'
import { useDispatch } from 'react-redux'
import { getUser } from '../../Redux/Auth/Actions'
const AdminDashboard = () => {
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt");
    useEffect(() => {
      if (jwt) {
        dispatch(getUser(jwt));
      }
    }, [jwt, dispatch]);
    return (
        <div className='p-6'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} className=''>
                    <div className='shadow-lg shadow-gray-300'>
                        <Achievements />
                    </div>

                </Grid>
                <Grid item xs={12} md={8}>
                    <div className='shadow-lg shadow-gray-300'>
                        <MonthyOverview />
                    </div>
                </Grid>
                <Grid className='' item xs={12} md={6}>
                    <div className='shadow-lg shadow-gray-300'>
                        <ViewOrdertable />

                    </div>
                </Grid>

                <Grid className='' item xs={12} md={6}>
                    <div className='shadow-lg shadow-gray-300'>
                        <ViewProducts />

                    </div>
                </Grid>

            </Grid>

        </div>
    )
}

export default AdminDashboard