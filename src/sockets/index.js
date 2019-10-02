var app = require("express")();
const config = require('config');

const socketServer = app.listen(config.get('socketPort'));

var io = require("socket.io")(socketServer);

const currentUser = () => {
  const clients = io.sockets.clients().connected;
  const sockets = Object.values(clients);
  const users = sockets.length;
  console.log(`${users} users are connected`);
}

class SocketServer {
  get init() {
    try {
      io.on('connection', socket => {
        currentUser();
        socket.on('disconnect', socket => {
          currentUser();
        });
        socket.on('addMessage', data => {
          socket.broadcast.emit('message', data);
        })
      });
    } catch (err) {
      return process.exit();
    }
  }
}

module.exports = new SocketServer();