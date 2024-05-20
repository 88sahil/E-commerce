const mongoose = require('mongoose')

function connectDB(){
    let DB= `${process.env.DbString}`.replace('<password>',process.env.Dbpassword)
    mongoose.connect(DB).then((con)=>console.log("i am also connectd to sahil's e-commerce")).catch((err)=>{console.log(err)})
}

module.exports = connectDB