let bcrypt = require('bcrypt')

// model import
let User = require('../models/user.model')

// utils import
let generateToken = require('../utils/generateToken.util')

// middlewares import
let verifyToken = require('../middlewares/verifyToken.middleware')

let registerUser = async (req, res) => {
    try {
        let { email } = req.body
        let foundUser = await User.findOne({ email })

        if (foundUser) {
            return res.status(400).json({
                message: "You have already signed up!"
            })
        } else {
            let user = await new User(req.body)
            let salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
            user = await user.save()

            let token = generateToken(user._id)

            return res.status(201).json({
                message: "Registration successfull!",
                response: {
                    name: user.email,
                    email: user.email,
                    _id: user._id,
                    token
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}

let loginUser = async (req, res) => {
    try {
        let { email, password } = req.body

        let foundUser = await User.findOne({ email })
        if (!foundUser) {
            return res.status(403).json({
                message: "Incorrect email or password!"
            })
        } else {

            let isPasswordValid = bcrypt.compare(password, foundUser.password)
            if (!isPasswordValid) {
                return res.status(403).json({
                    message: "Incorrect email or password!"
                })
            }

            let token = generateToken(foundUser._id)

            return res.status(201).json({
                message: "Logged in successfully!!",
                response: {
                    name: foundUser.email,
                    email: foundUser.email,
                    _id: foundUser._id,
                    token
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}

module.exports = { registerUser, loginUser }