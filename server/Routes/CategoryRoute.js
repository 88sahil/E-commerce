const express = require('express')
const CategoryRoute = express.Router()
const {addcategory, getAllCategory} = require('../Controllers/categoryController')
CategoryRoute.route('/').post(addcategory)
CategoryRoute.route('/').get(getAllCategory)
module.exports = CategoryRoute