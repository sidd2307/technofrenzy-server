const authControllers = require('../controllers/auth.controllers')

const router = require('express').Router()

router
    .post('/register', authControllers.registerUser)
    .post('/login', authControllers.loginUser)

module.exports = router