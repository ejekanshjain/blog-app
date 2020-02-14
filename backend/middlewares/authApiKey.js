require('dotenv').config()

module.exports = (req, res, next) => {
    const apiKey = req.headers['x-api-key']
    if (apiKey == null || apiKey != process.env.X_API_KEY) return res.status(401).json({ status: 401, message: 'Unauthorised client' })
    next()
}