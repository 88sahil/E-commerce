const category = require('../models/category')
const AppError = require('../utils/AppError')
const checkasync = require('./CheckAync')
exports.addcategory = checkasync(async(req,res,next)=>{
    let categ = await category.create(req.body)
    res.status(200).json({
        status:'success',
        message:`${categ.value} added successfully`
    })
})