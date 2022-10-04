const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    category: String,
    name: String,
    price: String,
    timestamp: Number,
    required: Boolean,
})

const Data = mongoose.model('Data', dataSchema)
module.exports = Data