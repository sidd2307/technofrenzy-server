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