const express = require('express')
const OrderRoute = express.Router()
const {protected} = require('../Controllers/UserControllers')
const {getMyOrders,getOrderById, getAllOrder,updateStatus, getStaticsOfOrder, getStaticsofProps, TopSelling} = require('../Controllers/OrderController')
OrderRoute.route('/myOrders').get(protected,getMyOrders)
OrderRoute.route('/getOrder/:id').get(getOrderById)
OrderRoute.route('/getAllOrder').get(protected,getAllOrder)
OrderRoute.route('/statusUpdate/:id').get(protected,updateStatus)
OrderRoute.route('/statics').get(protected,getStaticsOfOrder)
OrderRoute.route('/propstatics').get(protected,getStaticsofProps)
OrderRoute.route('/mostselling').get(protected,TopSelling)
module.exports = OrderRoute