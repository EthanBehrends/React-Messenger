const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const port = process.env.PORT || 5000

app.use(cors({
    origin: "*"
}))

app.use(express.json())

mongoose.connect('mongodb://localhost/messageApp', {
    useNewUrlParser: true, useUnifiedTopology: true
})
const connection = mongoose.connection

connection.once('open', () => {
    console.log("MongoDB connected successfully")
})

const messagesRouter = require('./route/messages')
const usersRouter = require('./route/users')
const channelsRouter = require('./route/channels')

app.use('/messages', messagesRouter)
app.use('/users', usersRouter)
app.use('/channels', channelsRouter)

server.listen(port, () => {
    console.log("Server is running on port " + port)
})

io.on('connection', socket => {
    socket.on('sendMessage', data => {
        socket.broadcast.emit("newMessage", data)
    })
})
