const category = require('../models/category')
const AppError = require('../utils/AppError')
const checkasync = require('./CheckAync')
exports.addcategory = checkasync(async(req,res,next)=>{
    let categ = await category.create(req.body)
    res.status(200).json({
        status:'success',
        message:`${categ.value} added successfully`,
        categ
    })
})
exports.getAllCategory = checkasync(async(req,res,next)=>{
    let categories = await category.find().select("value")
    res.status(200).json({
        status:'success',
        categories
    })
})