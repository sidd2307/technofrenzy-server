const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const privateKey = process.env.JWT_KEY

const verifyToken = async (req, res, next) => {
    try {
        const bearerToken = req.headers["Authorization"]
        const token = bearerToken.split(" ")[1]
        const decoded = jwt.verify(token, privateKey)
        const user = await User.findById(decoded._id)

        if (!user) {
            return res.status(401).json({
                message: "You are not authenticated to access this information!",
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({
            message: "You are not authenticated to access this information!",
            error: error.message
        })
    }
}

module.exports = verifyToken