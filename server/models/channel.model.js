const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const channelSchema = new Schema({
    creatorName: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        default: true
    },
    time: {
        type: Date,
        default: new Date
    },
    channel: {
        type: String,
        required: true
    }

})

const Channel = mongoose.model('Channel', channelSchema)

module.exports = Channel

