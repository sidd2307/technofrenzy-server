const mongoose = require('mongoose')

module.exports = async function (url) {
    try {
        await mongoose.connect(url)
        console.log("Database connected successfully!")
    } catch (error) {
        console.log("Error in DB Connection: ", error)
    }
}