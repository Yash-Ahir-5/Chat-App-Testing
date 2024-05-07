// ChatFooter.jsx
import React, { useState } from 'react';

const ChatFooter = ({ socket, users }) => {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('everyone');

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(recipient)
    if (message.trim() && localStorage.getItem('userName')) {
      if (recipient === 'everyone') {
        socket.emit('message', {
          text: message,
          name: localStorage.getItem('userName'),
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        });
      } else {
        socket.emit('privateMessage', {
          text: message,
          name: localStorage.getItem('userName'),
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
          recipientID: recipient,
        });
      }
    }
    setMessage('');
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
          <option value="everyone">Everyone</option>
          {users.map((user) => (
            <option key={user.socketID} value={user.socketID}>
              {user.userName}
            </option>
          ))}
        </select>
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
