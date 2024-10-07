const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path');
app.use(express.json())
app.use(cors())
require('./')

// Serve static files from the "uploads" directory

require('dotenv').config();
app.get('/', (req, res) => {
    return res.status(200).send({ message: "welcome to ecommerce api", status: true })
})
const authRouter = require('./routes/authRoutes')
app.use('/auth', authRouter)

const userRouter = require('./routes/userRoutes')
app.use('/api/users', userRouter)

const productRouter = require('./routes/productRoutes')
app.use('/api/products', productRouter)

const adminProductRouter = require('./routes/adminProductRoutes')
app.use('/api/admin/products', adminProductRouter)


const cartRouter = require('./routes/cartRoutes')
app.use('/api/cart', cartRouter)

const cartItemRouter = require('./routes/cartitemRoutes')
app.use('/api/cartitem', cartItemRouter)

const orderRouter = require('./routes/orderRoutes')
app.use('/api/orders', orderRouter)

const adminorderRouter = require('./routes/adminOrderRoutes')
app.use('/api/admin/order', adminorderRouter)

const ratingRouter = require('./routes/ratingRoutes')
app.use('/api/rating', ratingRouter)

const stripeRouter = require('./routes/stripeRoutes')
app.use('/api/stripe', stripeRouter)
const reviewRouter = require('./routes/reviewRoutes')
app.use('/api/review', reviewRouter)
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;