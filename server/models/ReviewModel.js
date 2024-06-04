const mongoose = require('mongoose');
const Item = require('./ItemModel');
const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'UserModel'
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'items'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    rating:{
        type:Number,
        required:[true,'please give rating']
    },
    message:{
        type:String,
        required:[true,'please write a message']
    }
},{toJSON:{virtuals:true},toObject:{virtuals:true}})
reviewSchema.index({user:1,product:1},{unique:true});
reviewSchema.statics.calcAve = async function(productId){
        let statics = await this.aggregate([
            {
                $match:{product:productId}
            },
            {
                $group:{
                    _id:`${productId}`,
                    nRating:{$sum:1},
                    aveRating:{$avg:`$rating`}
                }
            }
        ])
        let noStatics = await this.aggregate([
            {
                $match:{product:productId}
            },
            {
                $group:{
                    _id:`$rating`,
                    Rate:{$sum:1}
                }
            }
        ])
        let item = await Item.findById(productId);
        let resObjs = []
                for(let ele of noStatics){
                    resObjs.push({Rate:ele._id,numberofRates:ele.Rate})
                }
        if(resObjs.length>0){
            item.staticOfReview = resObjs
        }else{
            item.staticOfReview = []
        }
        if(statics.length>0){
            item.NoofRating = statics[0].nRating
            item.AverageRating = statics[0].aveRating
        }else{
            item.NoofRating =0;
            item.AverageRating =0
        }
        await item.save()
}
reviewSchema.post('save',function(){
    this.constructor.calcAve(this.product);
})
reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:"username photo"
    })
    next()
})
reviewSchema.pre(/^findOneAnd/,async function(next){
    this.r = await this.clone().findOne();
    next();
})
reviewSchema.post(/^findOneAnd/, async function(){
    await this.r.constructor.calcAve(this.r.product);
})
 const ReviewModel = mongoose.model("review",reviewSchema);
 module.exports = ReviewModel