const mongoose = require('mongoose')
require('dotenv').config()


mongoose
    .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db;