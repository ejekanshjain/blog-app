require('dotenv').config()

module.exports = (req, res, next) => {
    const apiKey = req.headers['x-api-key']
    if (apiKey == null || apiKey != process.env.X_API_KEY) return res.status(403).json({ status: 403, message: 'Unauthorised client' })
    next()
}