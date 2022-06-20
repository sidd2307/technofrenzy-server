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
        const questions = await Question.find()
            .sort({ createdAt: -1 })
            .populate("author")
            .exec()

        res.status(200).json({
            response: {
                questions
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

const getQuestionById = async (req, res) => {
    try {
        const id = req.params.id
        const question = await Question.findOne({ _id: id })
            .populate("author")
            .exec()

        res.status(200).json({
            response: {
                question
            },
            message: "Question fetched successfully!"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user._id
        const question = await Question.findOneAndDelete({ _id: id, author: userId })

        if (!question) {
            res.status(404).json({
                message: "Question couldn't be found!"
            })
        }

        res.status(200).json({
            response: {
                question
            },
            message: "Question deleted successfully!"
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
    getAllQuestions,
    getQuestionById,
    deleteQuestion
}