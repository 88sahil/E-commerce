const {CartItem,Cart} = require('../models/Cart')
const checkAsync = require('./CheckAync')
const AppError = require('../utils/AppError')

module.exports.AddToCart = checkAsync((async(req,res,next)=>{
        let cart = await Cart.findOne({user:req.params.id})
        if(!cart){
            cart = await Cart.create({user:req.params.id});
        }
        let data = req.body
        data.cartId = cart._id
        data.totalprice = data.pricetopay*data.quantity
        let product = await CartItem.findOne({$and:[{cartId:data.cartId},{item:data.item}]})
        if(product){
            product.quantity++;
            product.totalprice = product.pricetopay*product.quantity;
            await product.save()
        }else{
            product = await CartItem.create(data)
        }
        await cart.populate('products')
        res.status(200).json({
            status:'success',
            cart
        })
}))
module.exports.removeFromcart=checkAsync(async(req,res,next)=>{
    let {cartId,itemId} = req.body
    let product = await CartItem.findOne({$and:[{cartId:cartId},{item:itemId}]})
    if(product && product.quantity>0){
        product.quantity--;
        if(product && product.quantity==0){
            await product.deleteOne()
        }else{
            product.totalprice = product.pricetopay*product.quantity;
            await product.save()
        } 
    }else{
        return next(new AppError("can't find this product",404));
    }
    let cart = await Cart.findById(cartId).populate('products')
    res.status(200).json({
        status:'success',
        cart
    })
})