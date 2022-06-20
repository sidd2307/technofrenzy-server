// models import
const Question = require('../models/question.model')

const postQuestion = async (req, res) => {
    try {
        const author = {
            name: req.user.name,
            _id: req.user._id
        }

        const question = await new Question({ author, ...req.body })
        question.author = author
        await question.save()

        res.status(201).json({
            response: {
                question
            },
            message: "Your question has been posted successfully!"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}

const getAllQuestions = async (req, res) => {
    try {
        const userId = req.user._id
        const questions = await Question.find()
            .sort({ createdAt: -1 })
            .populate("author")
            .exec()

        const updatedQuestions = questions.map((question) => {
            if (question.upvotes.includes(userId)) {
                question.isLiked = true
            }
            return question
        })

        res.status(200).json({
            response: {
                questions: updatedQuestions
            },
            message: "Questions fetched successfully!"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}

module.exports = {
    postQuestion,
    getAllQuestions
}