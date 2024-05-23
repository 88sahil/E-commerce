const {cloudupload} = require('../utils/cloudinary')
const checkAsync = require('./CheckAync')
const AppError = require('../utils/AppError')
exports.uploadphoto=checkAsync(async(req,res,next)=>{
        if(!req.file.path) return next(new AppError("please upload file first",400))
        let response = await cloudupload(req.file.path)
        if(!response) return next(new AppError("failed to upload image",500));
        res.status(200).json({
            status:"success",
            message:"photo successfully upload",
            url:response.url,
            photoId:response.public_id
        })
})