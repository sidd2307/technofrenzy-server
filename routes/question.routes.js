const router = require('express').Router()
const Question = require('../models/question.model')

// controller import
const questionController = require('../controllers/question.controllers')

router
    .post('/', questionController.postQuestion)
    .get('/', questionController.getAllQuestions)
    .get('/:id', questionController.getQuestionById)
    .delete('/:id', questionController.deleteQuestion)

module.exports = router