require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const LoginSchema = require('../models/validationSchemas').LoginSchema
const User = require('../models/User')

router.post('/', async (req, res) => {
    LoginSchema.validateAsync(req.body)
        .then(async ({ email, password }) => {
            try {
                const user = await User.find({
                    email
                })
                if (user.length == 0) return res.status(400).json({ status: 400, message: 'Invalid Email or Password' })
                const validatePass = await bcrypt.compare(password, user[0].password)
                if (validatePass) {
                    const result = {
                        _id: user[0]['_id'],
                        name: user[0].name,
                        email: user[0].email,
                        createdAt: user[0].createdAt,
                        updatedAt: user[0].updatedAt
                    }
                    const token = await jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                        data: user[0]
                    }, process.env.JWT_SECRET)
                    res.status(200).json({ message: "Login Successfull", results: result, token })
                } else {
                    res.status(400).json({ status: 400, message: 'Invalid Email or Password' })
                }
            } catch (err) {
                console.log(err)
                res.status(500).json({ status: 500, message: 'Internal Server Error' })
            }
        })
        .catch(reason => {
            res.status(400).json({ status: 400, message: reason.details[0].message })
        })
})

module.exports = router