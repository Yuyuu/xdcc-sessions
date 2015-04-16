"use strict";

var Server = require("./src/web/server");

function App() {
  var server;

  this.run = function () {
    startServer();
  };

  function startServer() {
    server = new Server();
    server.start();
  }
}

if (require.main === module) {
  new App().run();
}

module.exports = App;