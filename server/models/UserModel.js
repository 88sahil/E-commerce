const mongoose= require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const findOrCreate = require("mongoose-findorcreate");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'please enter valied email']
    },
    countryCode:{
        type:String,
    },
    number:{
        type:Number,
        
    },
    location:{
        type:{
            type:String,
            default:"Point",
            enums:['Point']
        },
        zipcode:Number,
        address:{
            type:String
        },
        City:{
            type:String
        },
        Country:{
            type:String
        }
    }
    ,
    password:{
        type:String,
        select:false
    },
    conformpassword:{
        type:String,
        validate:{
            validator:function(el){
                return el===this.password
            },
            message:'passwords are not some'
        }
    },
    googleId:String,
    photo:String,
    photoId:String,
    isGoogleUser:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    isactive:{
        type:Boolean,
        default:true
    },
        likes:[{
            type:mongoose.Schema.ObjectId,
            ref:'items'
        }]
    ,
    passwordResetToken:String,
    passwordResetTokenExpires:Date,
    passwordchangedAt:Date
},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
})

userSchema.index({email:1})
userSchema.plugin(findOrCreate)
//encrypt password
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12)
    this.conformpassword = undefined
    next()
})
userSchema.pre(/^find/,function(next){
    this.find({isactive:{$ne:false}})
    next();
})
userSchema.methods.comparepassword=async(candidatepassword,password)=>{
    return await bcrypt.compare(candidatepassword,password)
}
userSchema.methods.ispasswordChanged=function(timestamp){
    if(!this.passwordchangedAt) return false;
    return parseInt(this.passwordchangedAt.getTime())>timestamp*1000
}
userSchema.methods.createPasswordReset=function(){
    let resetByte = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetByte).digest('hex')
    this.passwordResetTokenExpires = Date.now()+5*60*1000
    return resetByte
}
const User = mongoose.model("UserModel",userSchema)
module.exports = User