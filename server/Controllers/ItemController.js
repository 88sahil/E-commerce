const AppError= require('../utils/AppError')
const checkasync =require('../Controllers/CheckAync')
const {cloudupload,clouddelete} = require('../utils/cloudinary')
const ApiFeatures = require('./ApiFeatures')
const Item = require('../models/ItemModel')
const filterObj = (Obj,...fields)=>{
    let FinalObj={}
    for(let ele in Obj){
        if(fields.includes(ele)){
            FinalObj[ele] = Obj[ele]
        }
    }
    return FinalObj
}
module.exports.getAllItem = checkasync(async(req,res,next)=>{
    let queryString = req.query
    let features = new ApiFeatures(Item,queryString).filter().pagination().sort().limitFields()
    let items = await features.query
    let totalitems = await Item.countDocuments()
    if(!items) return next(new AppError("fail to get items",404));
    res.status(200).json({
        status:'success',
        totalitems:totalitems,
        results:items.length,
        items
    })

})
module.exports.getItem =  checkasync(async(req,res,next)=>{
    let id = req.params.id;
    if(!id) return next(new AppError("please request valid item",404));
    let item = await Item.findById(id).populate('reviews');
    if(!item) return next(new AppError("can't find this Item",404));
    res.status(200).json({
        status:'success',
        item
    })
})
module.exports.getlisting = checkasync(async(req,res,next)=>{
    let title = req.query.title
    let items = await Item.find({title:{$regex:title,$options:"i"}}).select("title coverphoto price discount")
    res.status(200).json({
        status:"success",
        result:items.length,
        items
    })
})
module.exports.UploadPhoto=checkasync(async(req,res,next)=>{
    let response = await cloudupload(req.file.path);
    if(!response) return next(new AppError("fail to upload",500));
    res.status(200).json({
        status:"success",
        url:response.url,
        id:response.public_id
    })
})
module.exports.AddItem = checkasync(async(req,res,next)=>{
    let item = await Item.create(req.body);
    if(!item) return next(new AppError('fail to add data',500))
    res.status(200).json({
        status:'success',
        item
    })
})

module.exports.Update=checkasync(async(req,res,next)=>{
    let data = req.body
    let finaldata = filterObj(data,"tittle","price","description","discount","isAvailable","manufacturour","category");
    let item = await Item.findByIdAndUpdate(req.params.id,finaldata,{new:true});
    if(!item) return next(new AppError("fail to update item",500));
    res.status(200).json({
        status:"success",
        message:`${item.title} successfully updated`,
        item
    })
})
module.exports.UpdateCoverPhoto=checkasync(async(req,res,next)=>{
    let id = req.params.id;
    let item = await Item.findById(id);
    if(!item) return next(new AppError("can't find this item",404));
    if(item.coverphotoId){
        let del = await cloudupload(item.coverphotoId);
    }
    let response = await cloudupload(req.file.path);
    item.coverphoto = response.url
    item.coverphotoId = response.public_id
    await item.save
    require('fs').unlinkSync(req.file.path)
    res.status(200).json({
        status:'success',
        message:"photo uploaded successfully",
        item
    })
})
module.exports.uploadphotos = checkasync(async(req,res,next)=>{
    let id = req.params.id
    let photos = req.files
    let finalPhotos =[]
    let item = await Item.findById(id);
    if(!item) return next(new AppError("can't find item with is Id",404));
    for(let ele of photos){
        let response = await cloudupload(ele.path)
        if(!response) return next(new AppError("fail to upload photo",500));
        finalPhotos.push({photo:response.url,photoId:response.public_id})
    }
    item.photos.push(...finalPhotos);
    await item.save();
    res.status(200).json({
        status:'success',
        message:"photos uploaded succesfully",
        item
    })
})
module.exports.removephoto=checkasync(async(req,res,next)=>{
    let id = req.params.id
    let photoid = req.query.photoid
    let item = await Item.findById(id)
    if(!item) return next(new AppError("Item not found",404));
    let photo = item.photos.find((ele)=>ele._id.equals(photoid));
    if(!photo) return next(new AppError("can't find this photo",404));
    await clouddelete(photoid);
    item.photos.pop(photo);
    await item.save();
    res.status(200).json({
        status:'success',
        message:'photo deleted successfullu',
        item
    })
})

module.exports.deleteitem= checkasync(async(req,res,next)=>{
    let id = req.params.id
    let item = await Item.findById(id);
    if(!item) return next(new AppError("no item found",404));
    if(item.coverphotoId){
        await clouddelete(item.coverphotoId);
    }
    if(item.photos.length>0){
        for(let ele of item.photos){
            await clouddelete(ele.photoId)
        }
    }
    await item.deleteOne();
    res.status(200).json({
        status:'success',
        message:`${item.title} deleted successfully`
    })
})