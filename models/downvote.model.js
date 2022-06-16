const mongoose = require('mongoose')

const downvoteSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer",
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
)

module.exports = mongoose.Model("Downvote", downvoteSchema)