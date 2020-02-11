// Make connection.
// const PORT = process.env.PORT || 5000
// const socket = io.connect(`http://localhost:${process.env.PORT}`)
const socket = io.connect(`http://localhost:5000`)
console.log('made socket connection', socket)

//query DOM

let message = document.getElementById('message')
let handle = document.getElementById('handle')
let btn = document.getElementById('send')
let output = document.getElementById('output')

//emit events

btn.addEventListener('submit', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value 
    })
})

socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
})