const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: new Date
    },
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    edited: {
        type: Boolean,
        default: false
    }

})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message

