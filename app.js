"use strict";

var Database = require("./src/infrastructure/mongo/database");
var Warehouses = require("./src/warehouses");
var Commands = require("./src/commands");
var Server = require("./src/web/server");
var CommandBus = require("./src/utils/command_bus");
var logger = require("./src/utils/log")(__filename);

function App() {
  var commandBus = new CommandBus();
  var server;

  this.run = function () {
    promiseWarehousesInitialization().then(function (warehouses) {
      initializeCommands(warehouses);
      startServer();
    }).catch(function (error) {
      logger.error("Error during server initialization:", error);
    });
  };

  function promiseWarehousesInitialization() {
    return new Database().promiseToInitialize().then(function (database) {
      return new Warehouses(database.createConnector());
    });
  }

  function initializeCommands(warehouses) {
    var commands = new Commands({
      warehouses: warehouses,
      commandBus: commandBus
    });
    commands.subscribeAllToBus();
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