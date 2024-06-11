const stripe = require('stripe')(process.env.Stripe_secret);
const {Order,OrderItem} = require('../models/OrderModel')
const AppError = require('../utils/AppError');
const checkasync = require('../Controllers/CheckAync');
module.exports.checkout = async(req,res,next)=>{
    try{
        const {item} = req.body
        const lineItems = item.products.map((ele)=>{return{
            price_data:{
                currency:"inr",
                product_data:{
                    name:`${ele.item.title}`,
                    images:[`${ele.item.coverphoto}`]
                },
                unit_amount:ele.pricetopay*100
            },
            quantity:ele.quantity
        }})
        let order = await Order.create({user:req.user.id,status:'pending',totalbill:item.totalbill,paymentstatus:'pending'})
        let items = await Promise.all(
            item.products.map((ele)=>(
                OrderItem.create({orderId:order._id,item:ele.item._id,quantity:ele.quantity,pricetopay:ele.pricetopay,totalprice:ele.totalprice})
            ))
        )
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:"payment",
            line_items:lineItems,
            shipping_address_collection: {
                allowed_countries: ['IN'],
              },
            success_url:`https://e-commerce-wvh2-qw50sstcd-88sahils-projects.vercel.app/success/${order._id}`,
            cancel_url:`https://e-commerce-wvh2-qw50sstcd-88sahils-projects.vercel.app/cancel/${order._id}`,
        })
        order.paymentsessionId = session.id;
        await order.save();
        res.status(200).json({
            session:session.url,
            wholesession:session
        })
    }catch(err){
        console.log(err)
    }
}