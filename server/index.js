const express = require('express');
const socketio = require('socket.io');
const http = require("http");
const cors = require("cors");

const {addUser, removeUser, getUser, getUsersInRoom} = require("./users");

const PORT = process.env.PORT || 5000;

const router = require('./router');
const { userInfo } = require('os');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('We have a new connection!!');

  socket.on('join', ({name, room}, callback) => {

    const {error, user} = addUser({ id: socket.id, name, room});

    if(error) return callback(error);

    socket.join(user.room);
  })

  socket.on('disconnect', () => {
    console.log("User has left");
  })
})

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

