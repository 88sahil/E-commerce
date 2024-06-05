const express = require('express')
const BrandR = express.Router();
const {uploader} = require('../middlewares/multer')
const {uploadphoto} = require('../Controllers/UploadPhoto')
const {AddBrand, deleteBrand, getAllbrands} = require('../Controllers/BrandController')
BrandR.route('/uploadphoto').post(uploader,uploadphoto)
BrandR.route('/AddBrand').post(AddBrand);
BrandR.route('/deletebrand/:id').delete(deleteBrand)
BrandR.route('/getAllbrands').get(getAllbrands)
module.exports = BrandR