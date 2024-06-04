const ReviewModel = require('../models/ReviewModel')
const AppError = require('../utils/AppError')
const checkasync = require('./CheckAync')
module.exports.postReview =checkasync(async(req,res,next)=>{
    let data = req.body
    let productId = req.params.id
    data.user = req.user._id
    data.product = productId
    let Review = await ReviewModel.create(data)
    if(!Review) return next(new AppError("fail to add review",500));
    res.status(201).json({
        status:'success'
    })
})
module.exports.deleteReview = checkasync(async(req,res,next)=>{
    let id = req.params.id
    let review = await ReviewModel.findByIdAndDelete(id);
    res.status(200).json({
        status:'success'
    })
})