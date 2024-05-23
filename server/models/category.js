const mongoose = require('mongoose')
const categorySchema =new mongoose.Schema({
        value:String
}) 

const category = mongoose.model("category",categorySchema)
module.exports = category