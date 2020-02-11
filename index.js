require('dotenv').config();

const express = require('express')
const socket = require('socket.io')


const app = express()
// const PORT = process.env.PORT || 5000;
const server = app.listen(5000, () => {
    // console.log(`\n ** Running on http://localhost:${PORT}... ** \n`)
    console.log(`\n ** Running on http://localhost:5000... ** \n`)

})

// app.use((error, req, res, next) => {
//     console.log('error: ', error)
//     res.status(500).json({
//         message: "Something went horribly wrong."
//     })
// })

//static files.
app.use(express.static('public'));

//socket setup
const io = socket(server)
io.on('connection', (socket) => {
    console.log('Made socket connection', socket.id)

    //when we get a 'chat' message
    socket.on('chat', (data) => {
        //we want to transmit what we get from one socket to the rest of the open sockets connected to the server.
        io.sockets.emit('chat', data)
    })
})