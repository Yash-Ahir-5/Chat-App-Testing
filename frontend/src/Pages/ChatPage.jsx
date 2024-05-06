// ChatPage.jsx
import React, { useEffect, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages(prevMessages => [...prevMessages, data]));
    socket.on('newUserResponse', (data) => setUsers(data));
    socket.on('privateMessage', (data) => setMessages(prevMessages => [...prevMessages, data]));
    return () => {
      // Clean up socket listeners to avoid memory leaks
      socket.off('messageResponse');
      socket.off('newUserResponse');
      socket.off('privateMessage');
    };
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} users={users} />
      </div>
    </div>
  );
};

export default ChatPage;
