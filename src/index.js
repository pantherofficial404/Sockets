const express = require('express');
const config = require('config');
const absPath = require('app-module-path');
absPath.addPath(__dirname);

const socketServer = require('sockets');
const server = express();

const PORT = process.env.PORT || config.get('port');
const init = (() => {
  try {
    server.listen(PORT);
    console.log(`Server is running ${PORT}`);
    socketServer.init;
  } catch (err) {
    return process.exit();
  }
})();

module.exports = server;

