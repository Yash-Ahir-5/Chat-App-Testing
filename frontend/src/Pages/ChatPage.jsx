// ChatPage.jsx
import React, { useEffect, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('messageResponse', (data) =>  { setMessages([...messages, data]) });
    socket.on('newUserResponse', (data) => setUsers(data));
    socket.on('privateMessageResponse', (data) => { setMessages([...messages, data]) });
  }, [socket, messages]);
  console.log(messages);
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
