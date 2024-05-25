const stripe = require('stripe')(process.env.Stripe_secret);
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
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:"payment",
            line_items:lineItems,
            success_url:"http://localhost:5174/success",
            cancel_url:"http://localhost:5174/cancel"
        })
        res.status(200).json({
            session:session
        })
    }catch(err){
        console.log('|')
        console.log('|')
        console.log('|')
        console.log('|')
        console.log('|')
        console.log('|')
        console.log('|')
        console.log('|')
        console.log('|')
        console.log('|')
        console.log(err)
    }
}