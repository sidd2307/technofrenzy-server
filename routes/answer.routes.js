const router = require('express').Router()

const answerController = require('../controllers/answer.controllers')

router.post('/:questionId', answerController.postAnswer)
    .delete('/:questionId/:answerId', answerController.deleteAnswer)
    .post('/upvote', answerController.upvoteAnswer)
    .post('/downvote', answerController.downvoteAnswer)
    .get('/:questionId', answerController.getAllAnswers)
    .get('/getAnswerById/:answerId', answerController.getAnswerById)

module.exports = router