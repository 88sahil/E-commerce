require('dotenv').config()
const express = require('express')
const App = express()
const DB=require('./DB/Db');
const session = require('express-session')
const cookieparser = require('cookie-parser')
const GlobalErrorHandle = require('./utils/GlobalErrorHandle')
const UserRoute = require('./Routes/UserRoute')
const ItemRoute = require('./Routes/ItemRoute')
const passport = require('passport')
require('./Controllers/OauthController')
//databse
DB()
//google auth

App.use(session({
  secret:'myname',
  resave:'false',
  saveUninitialized:true,
  cookie:{secure:false}
}))
App.use(passport.initialize())
App.use(passport.session())
App.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
App.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/Authenticate');
  });
//body parse
App.get('/Authenticate',function(req,res){
    let user = req.user
    res.send(`hello ${user.username}`)
})
App.get('/logout',function(req,res){
    req.session.destroy()
    res.send("see you again")
})
App.get('/login',function(req,res){
    res.send('fail')
})


App.use(express.json())
//error middleware"

//cookie parsers
App.use(cookieparser())
//routes
App.use('/api/v1/user',UserRoute)
App.use('/api/v1/item',ItemRoute)
App.use(GlobalErrorHandle)
App.listen(process.env.port,()=>{
    console.log(`welcome to sahil's E-commerce server ${process.env.port}`)
})