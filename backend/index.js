// const express = require('express');
// const app = express()
// const http = require('http').createServer(app)

// var io = require('socket.io')(http);
// // const cors = require('cors');
// // app.use(cors());
// const PORT = 3050;

// http.listen(PORT, () => {
//     console.log(`Server is started on port ${PORT}.`);
// })

// const socketIO = require('socket.io')(http, {
//     cors: {
//         origin: "http://localhost:5173"
//     }
// });

// let users = [];

// socketIO.on('connection', (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);
//   // console.log(socket);
//   socket.on('message', (data) => {
//     socketIO.emit('messageResponse', data);
//   });

//   //Listens when a new user joins the server
//   socket.on('newUser', (data) => {
//     //Adds the new user to the list of users
//     users.push(data);
//     // console.log(users);
//     //Sends the list of users to the client
//     socketIO.emit('newUserResponse', users);
//   });
//   // console.log(users);
//   socket.on('disconnect', () => {
//     console.log('🔥: A user disconnected');
//     //Updates the list of users when a user disconnects from the server
//     users = users.filter((user) => user.socketID !== socket.id);
//     console.log(users);
//     //Sends the list of users to the client
//     socketIO.emit('newUserResponse', users);
//     socket.disconnect();
//   });
// });

// app.get('/api', (req, res) => {
//     res.json({
//         message: 'Hello world',
//     });
// });


// io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */

//     console.log('new client connected');

// });

// index.js

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const initializeSocket = require('./Controllers/SocketController');
// const { Welcome } = require('./Controllers/User');

const PORT = 3050;

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});

initializeSocket(io);
// Welcome(io);

http.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}.`);
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});
