const express = require('express')
const router = express.Router()


const { authApiKey } = require('../middlewares')
router.use(authApiKey)

router.use('/users', require('./user'))
router.use('/posts', require('./post'))
router.use('/login', require('./login'))

module.exports = router