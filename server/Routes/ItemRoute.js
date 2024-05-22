const express = require('express')
const ItemRoute = express.Router()
const {AddItem,UploadPhoto,Update, uploadphotos, removephoto, getAllItem, deleteitem} = require('../Controllers/ItemController')
const {uploader}= require('../middlewares/multer')
const {multiuploader} = require('../middlewares/multer')
const {protected} = require('../Controllers/UserControllers')
ItemRoute.route('/').post(AddItem);
ItemRoute.route('/getAllitems').get(getAllItem)
ItemRoute.route('/uploadCoverphoto').post(uploader,UploadPhoto);
ItemRoute.route('/update/:id').patch(protected,Update)
ItemRoute.route('/uploadphoto/:id').patch(protected,multiuploader,uploadphotos)
ItemRoute.route('/removephoto/:id').get(protected,removephoto)
ItemRoute.route('/deleteItem/:id').get(protected,deleteitem)
module.exports = ItemRoute