const express = require('express');
const app = express()

let users = [];
// SocketController.js

// let users = []

// function initializeSocket(io) {
//     io.on('connection', (socket) => {
//       console.log(`⚡: ${socket.id} user just connected!`);
      
//       socket.on('message', (data) => {
//         io.emit('messageResponse', data);
//       });
  
//       socket.on('privateMessage', (data) => {
//         io.to(data.recipientSocketID).emit('messageResponse', data);
//         socket.emit('messageResponse', data); // Echo message to sender
//       });
      
//       socket.on('newUser', (data) => {
//         users.push(data);
//         console.log(users);
//         io.emit('newUserResponse', users);
//       });
      
//       socket.on('disconnect', () => {
//         console.log('🔥: A user disconnected');
//         users = users.filter((user) => user.socketID !== socket.id);
//         io.emit('newUserResponse', users);
//         socket.disconnect();
//       });
//     });
//   }
  
//   module.exports = initializeSocket;

// SocketController.js
function initializeSocket(io) {
    io.on('connection', (socket) => {
      console.log(`⚡: ${socket.id} user just connected!`);
      
      socket.on('message', (data) => {
        io.emit('messageResponse', data);
      });

    
  
      // socket.on('privateMessage', (data) => {
      //   // Emit the private message only to the specified recipient
      //   io.to(data.recipientSocketID).emit('messageResponse', data);
      //   // Optionally, you can emit the message back to the sender as well
      //   socket.emit('messageResponse', data); // Echo message to sender
      // });

      socket.on('privateMessage', (data) => {
        console.log(data);
        const recipientSocket = data.recipientID;
        if (recipientSocket) {
            io.to(recipientSocket).emit('privateMessageResponse', data);
        }
    });    
      
      socket.on('newUser', (data) => {
        users.push(data);
        console.log(users);
        io.emit('newUserResponse', users); // Emit updated user list
      });
      
      socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users = users.filter((user) => user.socketID !== socket.id);
        io.emit('newUserResponse', users); // Emit updated user list
        socket.disconnect();
      });
    });
  }
  
  module.exports = initializeSocket;
  
  
