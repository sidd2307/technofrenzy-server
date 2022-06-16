const express = require('express')
const cors = require('cors')
require('dotenv').config()

// routes imports

// middlewares
const verifyToken = require('./middlewares/verifyToken.middleware')

const app = express()

// db connection
const connectToDB = require('./db/db')
connectToDB(process.env.MONGO_URI)

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Data fetched successfully!",
        response: "Welcome to Technofrenzy server!"
    })
})

// routes and middleswares
app.use(verifyToken)

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server running on Port ${port}`))
