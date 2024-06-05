const mongoose = require('mongoose')
const orderItemSchema = new mongoose.Schema({
    orderId:{
        type:mongoose.Schema.ObjectId,
        ref:'order'
    },
    item:{
        type:mongoose.Schema.ObjectId,
        ref:'items'
    },
    quantity:{
        type:Number,
        default:1
    },
    pricetopay:{
        type:Number,
        required:true
    },
    totalprice:{
        type:Number,
        required:true
    }
},{toJSON:{virtuals:true},toObject:{virtuals:true}})

orderItemSchema.index({orderId:1,item:1},{unique:true});
orderItemSchema.pre(/^find/,function(next){
    this.populate({
        path:'item',
        select:"title discount price coverphoto"
    })
})
exports.OrderItem = mongoose.model("OrderItem",orderItemSchema);

const OrderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'UserModel'
    },
    date:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        enum:['accept','pending','rejected','delivered'],
    },      
    totalbill:Number,
    paymentstatus:{
        type:String,
        enum:['pending','success']
    }
},{toJSON:{virtuals:true},toObject:{virtuals:true}})
OrderSchema.virtual('orderItems',{
    localField:'_id',
    foreignField:'orderId',
    ref:'OrderItem'
})
 exports.Order = mongoose.model("order",OrderSchema)