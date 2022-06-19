const loginUser = require('../controllers/login.controller')
const registerUser = require('../controllers/register.controller')

const router = require('express').Router()

router
    .post('/register', registerUser)
    .post('/login', loginUser)

module.exports = router