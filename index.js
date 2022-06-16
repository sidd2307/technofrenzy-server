const express = require('express')
const cors = require('cors')
require('dotenv').config()

// routes imports

// middlewares

const app = express()

// db connection

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Data fetched successfully!",
        response: "Welcome to Technofrenzy server!"
    })
})

// routes

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server running on Port ${port}`))
