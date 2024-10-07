const mongoose = require('mongoose')

const mongoURL = "mongodb+srv://lovepreetkaur:lovepreet%401234@ecommerce.fqyhi.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce";

const connectDb = () => {
    console.log('database connected')
    return mongoose.connect(mongoURL);

}
module.exports = { connectDb }