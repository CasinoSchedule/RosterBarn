import socketio from 'socket.io';

var clients = [];

export default (server) => {
  const io = new socketio(server);

  io.on('connection', function(socket) {
    socket.on('add:message', function (message) {
      socket.broadcast.emit('add:message', message);
    });

    socket.on('private message', function (message){
      let client1 = clients.filter(client => client.username === message.receiver)[0];
      socket.broadcast.to(client1.socket.id).emit('private message', message);
    })

    socket.on('user:join', function (user) {
      clients = [...clients, {socket: socket, username: user}];

      let userList = clients.map(function(client){
        return client.username;
      })

      console.log(clients);

      io.sockets.emit('users:update', userList);
    });

    socket.on('disconnect', function () {
      clients = clients.filter(client => !Object.is(socket, client.socket));

      let userList = clients.map(function(client){
        return client.username;
      })

      io.sockets.emit('users:update', userList);
    })
  });
}



