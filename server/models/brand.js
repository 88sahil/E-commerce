const mongoose = require('mongoose')
const brandSchema = new mongoose.Schema({
    brandname:{
        type:String,
        required:[true,'please enter brand name']
    },
    foundBy:String,
    description:String,
    logo:String,
    logoId:String,
    mission:String
})

const Brand = mongoose.model("brand",brandSchema)
module.exports = Brand