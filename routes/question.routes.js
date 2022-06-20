const router = require('express').Router()
const Question = require('../models/question.model')

// controller import
const questionController = require('../controllers/question.controllers')

router
    .post('/', questionController.postQuestion)
    .get('/', questionController.getAllQuestions)

module.exports = router