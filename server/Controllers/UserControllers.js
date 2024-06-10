const User = require('../models/UserModel')
const AppError = require('../utils/AppError')
const checkasync = require('./CheckAync')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const Email = require('../utils/Email')
const crypto = require('crypto')
const {cloudupload,clouddelete} = require('../utils/cloudinary')
const createSignInToken = (id)=>{
    let token =  jwt.sign({id:id},process.env.JWTS,{
        expiresIn:process.env.expiresIn
    })
    return token;
}
const fileterObj =(obj,...fields)=>{
    let finalObj={}
    for(let ele in obj){
        if(fields.includes(ele)){
            finalObj[ele] = obj[ele]
        }
    }
    return finalObj
}
module.exports.createUser = checkasync(async(req,res,next)=>{
    let data = req.body
    let user = await User.create(data)
    if(!user){
        return next(new AppError("there is problem in create User",500))
    }
    let token = createSignInToken(user._id)
    await new Email(user,"").sendWelcome();
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+5*24*60*60*1000),
        httpOnly:true,
        secure:true,
        sameSite:'none'
    })
    res.status(201).json({
        status:"success",
        user
    })
})
module.exports.Login = checkasync(async(req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password){
        return next(new AppError("email or password missing",401))
    }
    let user = await User.findOne({$and:[{email:email},{isactive:{$ne:false}}]}).select('+password')
    if(user?.googleId){
        return next(new AppError("you are google User please login through it",401))
    }
    if(!user){
        return next(new AppError("please enter valid email or sign up",401))
    }
    let isCorrect = await user.comparepassword(password,user.password)
    if(!isCorrect){
        return next(new AppError("incorrect password",401))
    }
    let token = createSignInToken(user._id)
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+5*24*60*60*1000),
        httpOnly:true,
        secure:true,
        sameSite:'none'
    })
    res.status(200).json({
        status:'success',
        user
    })
})

module.exports.verifyuser = checkasync(async(req,res,next)=>{
    if(!req.cookies.jwt){
        return next(new AppError("please Login",401))
    }
    let decode = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWTS)
    if(!decode){
        return next(new AppError("invalid token",401))
    }
    let user = await User.findById(decode.id)
    if(!user){
        return next(new AppError("can't find user",401))
    }
    let ispasswordchanged = user.ispasswordChanged(decode.iat)
    if(ispasswordchanged){
        return next(new AppError("password changed pleas login again",401))
    }
    res.status(200).json({
        status:'success',
        user
    })
})

module.exports.protected = checkasync(async(req,res,next)=>{
    if(!req.cookies.jwt){
        return next(new AppError("please Login",401))
    }
    let decode = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWTS)
    if(!decode){
        return next(new AppError("invalid token",401))
    }
    let user = await User.findById(decode.id)
    if(!user){
        return next(new AppError("can't find user",401))
    }
    let ispasswordchanged = user.ispasswordChanged(decode.iat)
    if(ispasswordchanged){
        return next(new AppError("password changed pleas login again",401))
    }
    req.user = user
    next()
})

module.exports.changepassword=checkasync(async(req,res,next)=>{
    const {oldpassword,newpassword,newconformpassword}= req.body
    if(!req.user){
        return next(new AppError("please login",401))
    }
    let user = await User.findById(req.user._id).select("+password")
    if(user.googleId){
        return next(new AppError("you are google User please login through it",401))
    }
    if(!user){
        return next(new AppError("can't find user",401))
    }
    let iscorrect = await user.comparepassword(oldpassword,user.password)
    if(!iscorrect){
        return next(new AppError("please enter correct password",401))
    }
    console.log("hello")
    user.password = newpassword
    user.conformpassword = newconformpassword
    user.passwordchangedAt = Date.now()
    await user.save()
    let token = createSignInToken(user._id)
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+5*24*60*60*1000),
        httpOnly:true,
        secure:true,
        sameSite:'none'
    })
    res.status(200).json({
        status:'success',
        message:'password changed succesffully',
        user
    })

})
module.exports.forgotpassword=checkasync(async(req,res,next)=>{
    const {email} = req.query
    if(!email) return next(new AppError("please Enter Email",403));
    const user = await User.findOne({email:email})
    if(user?.googleId){
        return next(new AppError("you are google User please login through it",401))
    }
    if(!user) return next(new AppError("user not found",404));
    let resetString = user.createPasswordReset()
    let url = `http://localhost:5173/Changepassword/${resetString}`
    await new Email(user,url).sendLink()
    await user.save({validateBeforeSave:false})
    res.status(200).json({
        status:'success',
        message:'email send successfully sent'
    })
})

module.exports.updatepassword = checkasync(async(req,res,next)=>{
    let token = req.params.token
    let {password,conformpassword}= req.body
    let finaltoken = crypto.createHash('sha256').update(token).digest('Hex')
    let user = await User.findOne({passwordResetToken:finaltoken})
    if(user?.googleId){
        return next(new AppError("you are google User please login through it",401))
    }
    if(!user) return next(new AppError("can't find user",404));
    if(user.passwordResetTokenExpires<new Date(Date.now())) return next(new AppError("token expired try again!",401));
    user.password = password
    user.conformpassword = conformpassword
    user.passwordResetToken= undefined
    user.passwordResetTokenExpires = undefined
    user.passwordchangedAt = Date.now()
    await user.save()
    res.status(200).json({
        status:'success',
        message:'hurrah password change succssfully, please login'
    })
})
//upload photo
module.exports.uploadProfilephoto = checkasync(async(req,res,next)=>{
    let user = await User.findById(req.user._id)
    if(!user) return next(new AppError("can't find User",404));
    if(user.photoId){
        let del = await clouddelete(user.photoId)
        if(!del) return next(new AppError("fail to delete",500))
    }
    let response = await cloudupload(req.file.path)
    if(!response) return next(new AppError("fail to upload photo",500));
    user.photo = response.url
    user.photoId = response.public_id
    await user.save({validateBeforeSave:false})
    require('fs').unlinkSync(req.file.path)
    res.status(200).json({
        status:"sucess",
        message:"photo upload successfully",
        user
    })
})

module.exports.updateMe= checkasync(async(req,res,next)=>{
    let finalObj = fileterObj(req.body,"username","countryCode","number","location","isactive");
    let user = await User.findByIdAndUpdate(req.user._id,finalObj,{new:true})
    if(!user) return next(new AppError("fail to uplode user",400));
    res.status(200).json({
        status:'success',
        message:"user updated successfully",
        user
    })
})

module.exports.LogOut=checkasync((req,res,next)=>{
    res.cookie("jwt","",{
        expires:new Date(Date.now()-10*1000),
        httpOnly:true,
        secure:true,
        sameSite:'none'
    })
    res.status(200).json({
        status:'success',
        message:'logged out'
    })
})
module.exports.LikeItem=checkasync(async(req,res,next)=>{
    let id = req.query.Itemid;
    let user = await User.findById(req.user._id);
    if(!user) return next(new AppError("please login",401));
    let Item_Id = user.likes.find((ele)=>`${ele}`===id);
    if(Item_Id){
        user.likes.pop(Item_Id)
    }else{
        user.likes.push(id);
    } 
    await user.save();
    res.status(200).json({status:'success'})

})
module.exports.getLikeItem = checkasync(async(req,res,next)=>{
    let user = await User.findById(req.user._id).populate({path:'likes',select:'title _id coverphoto price discount'});
    if(!user) return next(new AppError("please Login"));
    res.status(200).json({
        status:'success',
        items:user.likes
    })
})