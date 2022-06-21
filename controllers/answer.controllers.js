const Answer = require('../models/answer.model')
const Question = require('../models/question.model')
const Upvote = require('../models/upvote.model')
const Downvote = require('../models/downvote.model')

const postAnswer = async (req, res) => {
    try {
        const questionId = req.params.questionId
        const author = req.user._id
        const answer = await new Answer({ questionId, author, ...req.body })
        await answer.save()

        res.status(201).json({
            message: "Answer posted successfully!",
            response: {
                answer
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}

const deleteAnswer = async (req, res) => {
    try {
        const questionId = req.params.questionId
        const answerId = req.params.answerId
        const author = req.user._id
        const answer = await Answer.findOneAndDelete({ questionId, _id: answerId, author: author })

        if (!answer) {
            return res.status(404).json({
                message: "Answer does not exist!"
            })
        }

        res.status(200).json({
            message: "Answer deleted successfully!",
            response: {
                answer
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}

const upvoteAnswer = async (req, res) => {
    try {
        const userId = req.user._id
        const answer = await Answer.findOne({ _id: req.body.answerid })

        if (!answer) {
            return res.status(404).json({
                message: "Answer could'nt be found!"
            })
        }

        const foundUpvote = await Upvote.findOne({ answerId: answer._id, author: userId })
        const foundDownvote = await Downvote.findOne({ answerId: answer._id, author: userId })

        if (foundDownvote) {
            answer.isDownVoted = false
            await Downvote.findOneAndDelete({ answerId: answer._id, author: userId })
            const foundIndex = answer.downvotes.indexOf(foundDownvote._id)
            answer.downvotes.splice(foundIndex, 1)
        }

        if (!foundUpvote) {
            answer.isUpVoted = true
            const newUpvote = await new Upvote({ answerId: answer._id, author: userId })
            await newUpvote.save();
            answer.upvotes.push(newUpvote)
        }

        await answer.save()
        res.status(200).json({
            response: { answer },
            message: "Answer updated successfully!"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}

const downvoteAnswer = async (req, res) => {
    try {
        const userId = req.user._id
        const answer = await Answer.findOne({ _id: req.body.answerid })

        if (!answer) {
            return res.status(404).json({
                message: "Answer could'nt be found!"
            })
        }

        const foundUpvote = await Upvote.findOne({ answerId: answer._id, author: userId })
        const foundDownvote = await Downvote.findOne({ answerId: answer._id, author: userId })

        if (foundUpvote) {
            answer.isUpVoted = false
            await Upvote.findOneAndDelete({ answerId: answer._id, author: userId })
            const foundIndex = answer.upvotes.indexOf(foundUpvote._id)
            answer.upvotes.splice(foundIndex, 1)
        }

        if (!foundDownvote) {
            answer.isDownVoted = true
            const newDownvote = await new Downvote({ answerId: answer._id, author: userId })
            await newDownvote.save();
            answer.downvotes.push(newDownvote)
        }

        await answer.save()
        res.status(200).json({
            response: { answer },
            message: "Answer updated successfully!"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}

const getAllAnswers = async (req, res) => {
    try {
        const question = await Question.findOne({ _id: req.params.questionId })

        if (!question) {
            return res.status(404).json({
                message: "The question you were looking for doesn't exist!"
            })
        }

        const answers = await Answer.find({ questionId: req.params.questionId })
            .populate("author")
            .populate("upvotes")
            .populate("downvotes")
            .exec()

        res.status(200).json({
            message: "Answers fetched successfully!",
            response: {
                answers
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}

const getAnswerById = async (req, res) => {
    try {
        const answer = await Answer.findOne({ _id: req.params.answerId })
            .populate("author")
            .populate("upvotes")
            .populate("downvotes")
            .exec()

        if (!answer) {
            return res.status(404).json({
                message: "The answer you were looking for doesn't exist!"
            })
        }

        res.status(200).json({
            message: "Answer fetched successfully!",
            response: {
                answer
            }
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
    postAnswer,
    deleteAnswer,
    upvoteAnswer,
    downvoteAnswer,
    getAllAnswers,
    getAnswerById
}