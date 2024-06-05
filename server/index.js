require('dotenv').config()
const express = require('express')
const App = express()
const DB=require('./DB/Db');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const cookieparser = require('cookie-parser')
const GlobalErrorHandle = require('./utils/GlobalErrorHandle')
const UserRoute = require('./Routes/UserRoute')
const ItemRoute = require('./Routes/ItemRoute')
const passport = require('passport')
const BrandR = require('./Routes/BrandRoute')
const CategoryRoute = require('./Routes/CategoryRoute');
const CartRoute = require('./Routes/Cart');
const ReviewRoute = require('./Routes/ReviewRoute')
require('./Controllers/OauthController')
const {checkout}=require('./Payments/Payment');
const AppError = require('./utils/AppError');
const {protected} = require('./Controllers/UserControllers')
const {Order,OrderItem} = require('./models/OrderModel')
const {CartItem,Cart} = require('./models/Cart')
const checkasync = require('./Controllers/CheckAync')
//databse
DB()
//google auth
App.use(express.json())
//error middleware"

//cookie parsers
App.use(cookieparser())
App.use(cors({
  origin:["http://localhost:5173"],
  credentials:true
}))
App.use(session({
  secret:'myname',
  resave:'false',
  saveUninitialized:true,
  cookie:{secure:false}
}))
App.get('/success/:id',protected,checkasync(async(req,res,next)=>{
  let order = await Order.findById(req.params.id)
  if(!order.user.equals(req.user._id)){
     return next(new AppError("you do not have permission to do this",401))
  }
  order.paymentstatus ='success'
  order.status ='accept'
  await order.save()
  let cart = await  Cart.findOne({user:req.user._id})
  let CartItems = await CartItem.deleteMany({cartId:cart._id})
  console.log(order)
  res.redirect('http://localhost:5173/')
 
}))
App.get('/cancel/:id',checkasync(async(req,res,next)=>{
  let orderi = await OrderItem.deleteMany({orderId:req.params.id})
  let order = await Order.findByIdAndDelete(req.params.id)
  res.redirect('http://localhost:5173/cart')
}))
App.post('/api/v1/checkout',protected,checkout)
App.use(passport.initialize())
App.use(passport.session())
App.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
App.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    
    res.redirect('/Authenticate');
    res.status(200).json({
      user:req.user
    })
  });
//body parse
App.get('/Authenticate',function(req,res,next){
    let token =  jwt.sign({id:req.user._id},process.env.JWTS,{
      expiresIn:process.env.expiresIn
  })
  res.cookie("jwt",token,{
    expires:new Date(Date.now()+5*24*60*60*1000),
    httpOnly:true,
    secure:true,
    sameSite:'none'
})
  res.redirect('http://localhost:5173/')
  
res.status(200).json({
  user:req.user
})

})

App.get('/logout',function(req,res){
    req.session.destroy()
    res.cookie("jwt","",{
      expires:new Date(Date.now()-10*60*1000)
    })
    res.status(200).json({
      status:'success'
    })
})
App.get('/login',function(req,res){
    res.send('fail')
})



//routes
App.use('/api/v1/user',UserRoute)
App.use('/api/v1/item',ItemRoute)
App.use('/api/v1/brands',BrandR)
App.use('/api/v1/category',CategoryRoute)
App.use('/api/v1/cart',CartRoute)
App.use('/api/v1/review',ReviewRoute)
//error handeler
App.use(GlobalErrorHandle)
App.listen(process.env.port,()=>{
    console.log(`welcome to sahil's E-commerce server ${process.env.port}`)
})