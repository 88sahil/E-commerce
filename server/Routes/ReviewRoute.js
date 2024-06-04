const express = require('express')
const ReviewRoute = express.Router()
const {postReview,deleteReview} = require('../Controllers/ReviewController')
const {protected} = require('../Controllers/UserControllers')
ReviewRoute.route('/postreview/:id').post(protected,postReview)
ReviewRoute.route('/deleteReview/:id').get(protected,deleteReview)
module.exports = ReviewRoute