require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const { UserSchema } = require('../models/validationSchemas')
const { User } = require('../models')

// Get Requests
router.get('/', async (req, res) => {
    if (process.env.APPLICATION_ENVIRONMENT != 'DEVELOPMENT') return res.status(404).send('Cannot GET /api/v1/users')
    try {
        const users = await User.find()
        res.status(200).json({ status: 200, results: users })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
})

router.get('/:id', async (req, res) => {
    if (process.env.APPLICATION_ENVIRONMENT != 'DEVELOPMENT') return res.status(404).send('Cannot GET /api/v1/users')
    try {
        const user = await User.find({
            _id: req.params.id
        })
        res.status(200).json({ status: 200, results: user })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
})


// Post Requests
router.post('/', (req, res) => {
    UserSchema.validateAsync(req.body)
        .then(async ({ name, email, password }) => {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)
            const userObj = new User({
                name,
                email,
                password: hash
            })
            try {
                const user = await userObj.save()
                res.status(201).json({ status: 201, message: 'User created Successfully' })
            } catch (err) {
                if (err.errmsg.includes('E11000 duplicate key error')) {
                    res.status(400).json({ status: 400, message: 'Email already exists' })
                } else {
                    console.log(err)
                    res.status(500).json({ status: 500, message: 'Internal Server Error' })
                }
            }
        })
        .catch(reason => {
            res.status(400).json({ status: 400, message: reason.details[0].message })
        })
})

module.exports = router