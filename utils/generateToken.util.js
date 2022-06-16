const jwt = require('jsonwebtoken')
const privateKey = process.env.JWT_KEY

const generateToken = function (id) {
    const token = jwt.sign(
        {
            _id: id
        },
        privateKey,
        {
            expiresIn: '1d'
        }
    )

    return token
}

module.exports = generateToken