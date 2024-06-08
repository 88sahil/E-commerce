const mongoose = require('mongoose')
const categorySchema =new mongoose.Schema({
        value:String
},{toJSON:{virtuals:true},toObject:{virtuals:true}}) 

const category = mongoose.model("category",categorySchema)
module.exports = category