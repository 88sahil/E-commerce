const User = require('../models/UserModel')
const AppError = require('../utils/AppError')
const checkasync = require('./CheckAync')

module.exports.createUser = checkasync(async(req,res,next)=>{
    let data = req.body
    let user = await User.create(data)
    if(!user){
        return next(new AppError("there is problem in create User",500))
    }
    res.status(201).json({
        user
    })
})