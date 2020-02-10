const express = require('express')
const router = express.Router()

const PostSchema = require('../models/validationSchemas').PostSchema
const Post = require('../models/Post')
const authToken = require('../middlewares/authToken')

router.use(authToken)

// Get Requests
router.get('/', async (req, res) => {
    try {
        let posts
        if (req.query.feed) posts = await Post.find().sort({ createdAt: -1 })
        else if (req.query.user) posts = await Post.find({ createdBy: req.query.user })
        else posts = await Post.find({
            createdBy: req.authUser.data._id
        })
        res.status(200).json({ status: 200, results: posts })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.find({
            _id: req.params.id
        })
        res.status(200).json({ status: 200, results: post })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
})

// Post Requests
router.post('/', (req, res) => {
    PostSchema.validateAsync(req.body)
        .then(async ({ title, body }) => {
            const postObj = new Post({
                title,
                body,
                createdBy: req.authUser.data._id
            })
            try {
                const post = await postObj.save()
                res.status(201).json({ status: 201, message: 'Post created Successfully', results: post })
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