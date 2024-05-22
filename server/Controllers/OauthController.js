require('dotenv').config({path:'../.env'})
const User = require('../models/UserModel')
const checkAsync = require('./CheckAync')
const AppError = require('../utils/Email')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
    passport.use(new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.GoogleCallBack}auth/google/callback`,
        scope:['profile','email'] 
      },
      async function(accessToken, refreshToken, profile, cb) {
            let user;
            user = await User.findOne({googleId:profile.id})
            if(!user){
                user = await User.create({googleId:profile.id,username:`${profile.displayName}`,isGoogleUser:true,email:`${profile.emails[0].value}`,photo:`${profile.photos[0].value}`,password:`${profile.emails[0].value}${profile.id}`,conformpassword:`${profile.emails[0].value}${profile.id}`})
            }
          return cb(null, user);
    }));
    passport.serializeUser((user,done)=>{
        done(null,user)
    })
    passport.deserializeUser((user,done)=>{
        done(null,user)
    })