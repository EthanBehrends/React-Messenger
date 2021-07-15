const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 4
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    hash: String,
    salt: String
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User