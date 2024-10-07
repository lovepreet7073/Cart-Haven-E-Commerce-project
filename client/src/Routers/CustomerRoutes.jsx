import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import HomePage from '../customer/pages/HomePage/HomePage'
import Cart from '../customer/components/Cart/Cart'
import Footer from '../customer/components/Footer/Footer'
import Navigation from '../customer/components/Navigation/Navigation'
import Product from '../customer/components/Product/Product'
import ProductDetails from '../customer/components/ProductDetails/ProductDetails'
import OrderDetails from '../customer/components/Order/OrderDetails'
import Checkout from '../customer/components/Checkout/Checkout'
import Order from '../customer/components/Order/Order'
import UserProfile from '../customer/components/User/UserProfile'
import Success from '../customer/components/Stripe/Success'
import Cancel from '../customer/components/Stripe/cancel'
import StripeCheckout from '../customer/components/Stripe/StripeCheckout'
const CustomerRoutes = () => {
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <div className='mt-0'>
                <Routes>
                    <Route path='/login' element={<HomePage />}></Route>
                    <Route path='/register' element={<HomePage />}></Route>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/cart' element={<Cart />}> </Route>
                    <Route path='/user/profile' element={<UserProfile />}> </Route>
                    <Route path='/:category/:section/:item' element={<Product />} />
                    <Route path='/product/:productId' element={< ProductDetails />}> </Route>
                    <Route path='/checkout' element={< Checkout />}> </Route>
                    <Route path='/stripe-checkout' element={< StripeCheckout />}> </Route>
                    <Route path='/account/order' element={< Order />}> </Route>
                    <Route path='/success' element={< Success />}> </Route>
                    <Route path='/cancel' element={< Cancel />}> </Route>

                </Routes>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    )
}

export default CustomerRoutes