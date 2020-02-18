const express = require('express')
const router = express.Router()


const { authApiKey } = require('../middlewares')
router.use(authApiKey)

router.use('/users', require('./user'))
router.use('/posts', require('./post'))
router.use('/signin', require('./signin'))

module.exports = router