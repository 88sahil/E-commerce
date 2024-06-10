const Brand = require('../models/brand')
const AppError = require('../utils/AppError')
const checkasync = require('./CheckAync')
exports.AddBrand = checkasync(async(req,res,next)=>{
    let item = await Brand.create(req.body)
    if(!item) return next(new AppError("fail to add brand",500));
    res.status(200).json({
        status:'success',
        message:`${item.brandname} added successfully`,
        brand:item
    })
})

exports.deleteBrand = checkasync(async(req,res,next)=>{
    console.log(req.params)
    let delItem = await Brand.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:'success',
        message:`${delItem.brandname} deleted successfully`
    })
})
exports.getAllbrands = checkasync(async(req,res,next)=>{
    let brands = await Brand.find();
    res.status(200).json({
        status:'success',
        brands
    })
})