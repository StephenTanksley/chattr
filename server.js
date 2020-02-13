const express = require('express')
const app = express() //create the express app
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 5000

io.on('connection', (client) => {
    console.log('a user connected', client.id)
})

io.on('chat', (data) => {
    console.log('Message received ---> ', data)
    io.emit(data)
})

io.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})