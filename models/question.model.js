const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
            required: true,
        },
        categoryName: {
            type: String,
            required: true
        },
        categoryNameFull: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        isLiked: {
            type: Boolean,
            default: false
        },
        upvotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Upvote'
            }
        ],
        downvotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Downvote'
            }
        ],
        answers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Answer"
            }
        ]
    },
    { timestamps: true }
)

module.exports = mongoose.model("Question", questionSchema)