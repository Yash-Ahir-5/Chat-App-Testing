import React, { useState } from 'react';

const ChatFooter = ({ socket, users }) => {
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(selectedUser);
    if (message.trim() && localStorage.getItem('userName')) {
      if (selectedUser === 'everyone') {
        socket.emit('message', {
          text: message,
          name: localStorage.getItem('userName'),
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        });
      } else {
        const recipientSocketID = users.find(user => user.userName === selectedUser)?.socketID;
        if (recipientSocketID) {
          socket.emit('privateMessage', {
            text: message,
            name: localStorage.getItem('userName'),
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
            recipientSocketID,
          });
        }
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
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="everyone">Everyone</option>
          {users.map((user) => (
            <option key={user.socketID} value={user.userName}>
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