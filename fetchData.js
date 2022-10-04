const mongoose = require('mongoose')
const Data = require('./dataSchema')
const connectDB = require('./connectDB')

connectDB()

Data.find({},{_id:0, required:0, __v:0}).then(result => {
    result.forEach(obj => {
      console.log(obj)
    })
    mongoose.connection.close()
  })