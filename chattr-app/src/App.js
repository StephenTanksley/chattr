import React, { useState } from 'react';
import './App.css';

//import Socket.io
import openSocket from 'socket.io-client'

const App = () => {
const PORT = process.env.PORT || 5000
const [newMessage, setNewMessage] = useState({
  handle: "",
  message: ""
});
const [allMessages, setAllMessages] = useState([])

const socket = openSocket(`http://localhost:${PORT}`)

socket.on('chat', (data) => {
  setAllMessages([...allMessages, data])
})


const handleChange = (e) => {
  e.preventDefault()
  console.log('new value', e.target.value)
}

const handleSubmit = (e) => {
  e.preventDefault()
}

const sendMessage = () => {
  console.log('Sent!');

  //emits the chat message written by the user to the text channel.
  socket.emit('chat', newMessage)

  //clear the input field after sending.
  setNewMessage('')
}



  return (
    <div className="app-container">
      <header className="app-header"><h2>Chat Client</h2></header>
      <div className="message-window">

        { allMessages.map(message => {
          return <div>{message}</div>
        })}

      </div>
      <div className="input-container">
        <input 
          name="handle"
          onChange={handleChange}
          placeholder="user handle..." />

        <input 
          name="message"
          onChange={handleChange}
          placeholder="type your message..." />
        
        <button 
          onClick={() => sendMessage()}>Send
        </button>
      
      </div>
    </div>
  )
}

export default App;
