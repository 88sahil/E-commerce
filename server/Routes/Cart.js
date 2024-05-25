const express = require('express')
const CartRoute = express.Router()
const {AddToCart, removeFromcart, GetCart} = require('../Controllers/CartController')
CartRoute.route('/getCart/:id').get(GetCart)
CartRoute.route('/addItem/:id').post(AddToCart)
CartRoute.route('/removeItem').post(removeFromcart)
module.exports = CartRoute