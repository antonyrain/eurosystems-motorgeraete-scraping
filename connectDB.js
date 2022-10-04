require('dotenv').config()
const mongoose = require('mongoose')
const URI = process.env.MONGO_URI

const connectDB = () => {
    try {
        mongoose.connect(URI)
        console.log('MongoDB connection SUCCESS')
    } catch (error) {
        console.error('MongoDb connetion FAIL')
        process.exit(1)
    }
}

module.exports = connectDB