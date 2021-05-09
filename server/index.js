const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 9000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const {addUser, removeUser, getUserInRoom, getUser} = require('./users')

//middleware
app.use(router);

io.on('connection', (socket)=>{
    console.log('we have connected');

    socket.on('join', ({name, room}, callback)=>{
        const {error, user} = addUser({id:socket.id, name, room});
        
        socket.join(user.room);

        socket.emit('message', ({user: 'admin', text: `${user.name}, welcome to the room ${user.room} `}));
        socket.broadcast.to(user.room).emit('mesage', {user: 'admin', text: `${user.name}, has joined`});

        
        
    });

    socket.on('sendMessage',(message, callback)=>{
        const user = getUser(socket.id)

        io.to(user.room).emit('message', ({user:user.name, text: message}));

        callback();
    })

    socket.on('disconnect', (socket)=>{
        console.log('User has left');
    })
})

server.listen(PORT, ()=> console.log(`Server is running in ${PORT}`));