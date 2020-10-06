const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
     {
        name: { type: String, required: true },
        email: { type: String, required: true },
        glucose_reading: { type: Array, required: true },
        time: { type : Array, required: true }
        // BGL_reading: [ { BGL: Number, time: Date }]

    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)

