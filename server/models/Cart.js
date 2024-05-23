const mongoose = require('mongoose')
const cartItemSchema = new mongoose.Schema({
    item:{
        type:mongoose.Schema.ObjectId,
        ref:'items'
    },
    quantity:{
        type:Number,
        default:1
    },
    cartId:{
        type:mongoose.Schema.ObjectId,
        ref:'cart'
    },
    pricetopay:Number,
    totalprice:Number
},{toObject:{virtuals:true}, toJSON:{virtuals:true}})
cartItemSchema.pre(/^find/,function(next){
    this.populate({path:'item',select:"-description -photos -isAvailable"})
    next()
})
cartItemSchema.index({item:1,cartId:1},{unique:1})
module.exports.CartItem = mongoose.model("cartItem",cartItemSchema)

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'UserModel'
    },
    upladated:Date,
    created:{
        type:Date,
        default:Date.now()
    }
},{toObject:{virtuals:true}, toJSON:{virtuals:true}})
cartSchema.virtual('products',{
    ref:'cartItem',
    localField:"_id",
    foreignField:"cartId",
})
module.exports.Cart = mongoose.model("cart",cartSchema)