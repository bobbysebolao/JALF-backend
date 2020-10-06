const mongoose = require('mongoose')
const dotenv = require ("dotenv")
dotenv.config();

const uri = process.env.DATABASE_URL

mongoose
    .connect(uri, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db;