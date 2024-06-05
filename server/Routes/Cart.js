const express = require('express')
const CartRoute = express.Router()
const {protected} = require('../Controllers/UserControllers')
const {AddToCart, removeFromcart, GetCart} = require('../Controllers/CartController')
CartRoute.route('/getCart').get(protected,GetCart)
CartRoute.route('/addItem/').post(protected,AddToCart)
CartRoute.route('/removeItem').post(protected,removeFromcart)
module.exports = CartRoute