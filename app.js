"use strict";

var Database = require("./src/infrastructure/mongo/database");
var Server = require("./src/web/server");
var CommandBus = require("./src/utils/command_bus");
var logger = require("./src/utils/log")(__filename);

function App() {
  var commandBus = new CommandBus();
  var server;

  this.run = function () {
    promiseDatabaseInitialization().then(function () {
      startServer();
    }).catch(function (error) {
      logger.error("Error during server initialization:", error);
    });
  };

  function promiseDatabaseInitialization() {
    return new Database().promiseToInitialize();
  }

  function startServer() {
    server = new Server({
      commandBus: commandBus
    });
    server.start();
  }
}

if (require.main === module) {
  new App().run();
}

module.exports = App;