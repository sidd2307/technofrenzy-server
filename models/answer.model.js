const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema(
    {
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        },
        author: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        explanation: {
            type: String,
            required: true
        },
        codeexplanation: {
            type: String,
            required: true
        },
        upvotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Upvote"
            }
        ],
        downvotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Downvote"
            }
        ],
        upvotesCount: {
            type: Number,
            default: 0
        },
        downvotesCount: {
            type: Number,
            default: 0
        },
        isUpVoted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Answer", answerSchema)