// Imports
require('dotenv').config()
const express = require('express')
const cors = require('cors')

// Initializing app
const app = express()

// Setting up middlewares
app.use(cors())
app.use(express.json())

// Setting Up Database
const db = require('./db/db')

// Routes
app.use('/api/v1', require('./routes/routes'))

// Server status
app.get('/', (req, res) => res.status(200).json({ status: 200, message: 'Server up and running' }))
app.get('/api', (req, res) => res.status(200).json({ status: 200, message: 'API server up and running' }))

// Starting Server
const port = process.env.PORT
app.listen(port, () => console.log(`Server Started on Port ${port}`))