const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization') // Get the Authorization header

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1] // Extract the token without 'Bearer '
        console.log(token)
        
        if (!token) return res.status(401).json({ error: 'Access denied' }) // Check if token is present

        try {
            const secret = process.env.JWT_SECRET_KEY
            const decoded = jwt.verify(token, secret)
            req.userId = decoded.userId // Attach userId to request object
            next() // Continue to the next middleware or route handler
        } catch (error) {
            return res.status(401).json({ message:error.message })
        }
    } else {
        return res.status(401).json({ message: 'Authorization token missing or invalid' })
    }
}

module.exports = verifyToken