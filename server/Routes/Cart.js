const express = require('express')
const CartRoute = express.Router()
const {AddToCart, removeFromcart} = require('../Controllers/CartController')
CartRoute.route('/addItem/:id').post(AddToCart)
CartRoute.route('/removeItem').post(removeFromcart)
module.exports = CartRoute