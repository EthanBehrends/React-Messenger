const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
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

app.use('/messages', messagesRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log("Server is running on port " + port)
})
