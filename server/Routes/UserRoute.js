const express = require('express')
const UserRoute = express.Router()
const {createUser} = require('../Controllers/UserControllers')
UserRoute.route('/').post(createUser)
module.exports = UserRoute