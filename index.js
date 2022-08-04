//Node Server which will handle socket.io connections

const io = require('socket.io')(8000)

const users = {}

io.on('connection', socket => { //io.on -> socket.io instances (listens to all instance message)
    socket.on('new-user-joined', name => {  //handles particular request (reads message emitted)
        users[socket.id] = name;    //whenever user joins, we append it's name to users{}
        socket.broadcast.emit('user-joined', name) //emits everyone except the user who joined

    })
    //if anyone sends a message, broadcast it to other people
    socket.on('send', message => {  //if anyone sends a message
        socket.broadcast.emit('receive', {message: message, name:users[socket.id]}) //receive the sent message
    })

    //if someone leaves the chat, let others know
    socket.on('disconnect', message => {  //if anyone disconnects
        socket.broadcast.emit('left', users[socket.id]) //rshow the user left
        delete users[socket.id]
    })
})


