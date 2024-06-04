const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema({
    title:{
        type:String,
        requried:[true,'please enter Item name']
    },
    price:{
        type:Number,
        required:[true,'please enter price']
    },
    coverphoto:{
        type:String,
        required:[true,'please Upload Photo']
    },
    coverphotoId:String,
    description:{
        type:String,
        require:[true,'please write description']
    },
    AverageRating:{
        type:Number,
        default:0
    },
    NoofRating:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        default:0
    },
    photos:[{
        photo:{
            type:String
        },
        photoId:String
    }],
    isAvailable:{
        type:Boolean,
        default:true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category'
    },
    manufacturour:{
        type:mongoose.Schema.ObjectId,
        ref:'brand'
    },
    publishedAt:{
        type:Date,
        default:Date.now()
    },
    staticOfReview:[
        {
            Rate:{
                type:Number,
                default:0
            },
            numberofRates:{
                type:Number,
                default:0
            }
        }
    ]
},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
})
itemSchema.virtual('reviews',{
    localField:"_id",
    foreignField:"product",
    ref:"review"
})
itemSchema.pre(/^find/,function(next){
    this.populate({
        path:'manufacturour',
        select:'brandname logo -_id'
    }).populate({
        path:'category',
        select:'-_id -__V'
    })
    next();
})
const Item = mongoose.model("items",itemSchema)
module.exports = Item