require('dotenv').config();

const express = require('express')
const socket = require('socket.io')

// App setup
const app = express()
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    // console.log(`\n ** Running on http://localhost:${PORT}... ** \n`)
    console.log(`\n ** Running on http://localhost:${PORT}... ** \n`)
})

//static files.
app.use(express.static('public'));

//socket setup
const io = socket(server)
io.on('connection', (socket) => {

    console.log('Made socket connection', socket.id)

    //handle chat event
    socket.on('chat', (data) => {
        //we want to transmit what we get from one socket to the rest of the open sockets connected to the server.
        io.sockets.emit('chat', data)
    })

    //handle typing event
    socket.on('typing', (data) => {
       socket.broadcast.emit('typing', data)
    })
})