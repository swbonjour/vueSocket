const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
    }
})

io.on('connection', (socket) => {
    const users = [];
    for(let [id, socket] of io.of('/').sockets) {
        users.push({
            userID: id,
            username: socket.handshake.auth.username,
            messages: [],
        })
    }

    socket.emit('users', users);

    socket.broadcast.emit('userConnected', {
        userID: socket.id,
        username: socket.handshake.auth.username,
    })

    socket.on('sendMessage', (message) => {
        socket.broadcast.emit('recieveMessage', (message));
    })

    socket.on('sendPrivateMessage', ({ message, to }) => {
        console.log(message);
        socket.to(to).emit('recievePrivateMessage', { message: message, username: socket.handshake.auth.username });
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('userDisconnected', (socket.handshake.auth.username));
    })
});

httpServer.listen(3000, () => {
    console.log('Server is listneing on 3000');
})