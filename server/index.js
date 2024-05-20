require('dotenv').config()
const express = require('express')
const App = express()
const DB=require('./DB/Db');
const cookieparser = require('cookie-parser')
const GlobalErrorHandle = require('./utils/GlobalErrorHandle')
const UserRoute = require('./Routes/UserRoute')
//databse
DB()
//body parse
App.use(express.json())
//error middleware
App.use(GlobalErrorHandle)
//cookie parsers
App.use(cookieparser())
//routes
App.use('/api/v1/user',UserRoute)
App.listen(process.env.port,()=>{
    console.log(`welcome to sahil's E-commerce server ${process.env.port}`)
})