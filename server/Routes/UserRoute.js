const express = require('express')
const UserRoute = express.Router()
const {createUser, Login,verifyuser,changepassword,protected,forgotpassword,updatepassword, uploadProfilephoto, updateMe, LogOut, LikeItem, getLikeItem} = require('../Controllers/UserControllers')
const User = require('../models/UserModel')
const {uploader} = require('../middlewares/multer')
UserRoute.route('/').post(createUser)
UserRoute.route('/login').post(Login)
UserRoute.route('/verify').get(verifyuser)
UserRoute.route('/forgotpassword').get(forgotpassword)
UserRoute.route('/updatepassword/:token').patch(updatepassword)
UserRoute.route('/changepassword').patch(protected,changepassword)
UserRoute.route('/uploadprofile').patch(protected,uploader,uploadProfilephoto)
UserRoute.route('/updateMe').patch(protected,updateMe)
UserRoute.route('/logout').get(LogOut)
UserRoute.route('/LikeItem').get(protected,LikeItem)
UserRoute.route('/getLikeItem').get(protected,getLikeItem)
module.exports = UserRoute