const express = require('express')
const CategoryRoute = express.Router()
const {addcategory} = require('../Controllers/categoryController')
CategoryRoute.route('/').post(addcategory)

module.exports = CategoryRoute