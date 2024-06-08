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
    },date:{
        type:Date,
        default:Date.now()
    }
},{toJSON:{virtuals:true},toObject:{virtuals:true}})

orderItemSchema.index({orderId:1,item:1},{unique:true});
orderItemSchema.pre(/^find/,function(next){
    this.populate({
        path:'item',
        select:"title discount price coverphoto"
    })
    next()
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
    },
    shippingAddress:{
        city:String,
    country:String,
    line1:String,
    line2:String,
    postal_code:String,
    state: String
    },
    rejectdata:Date,
    deliveryDate:Date,
    paymentsessionId:String,
    recieptlink:String
},{toJSON:{virtuals:true},toObject:{virtuals:true}})
OrderSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:"username email photo"
    })
    next()
})
OrderSchema.virtual('orderItems',{
    localField:'_id',
    foreignField:'orderId',
    ref:'OrderItem'
})
 exports.Order = mongoose.model("order",OrderSchema)