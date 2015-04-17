"use strict";

var _ = require("lodash");
var logger = require("../utils/log")(__filename);

function Commands(dependencies) {
  var commands = [
    new (require("./user/command_find_user"))(dependencies)
  ];

  this.subscribeAllToBus = function () {
    _.each(commands, function (command) {
      logger.debug("Subscription to the bus of the command", command.constructor.name);
      command.subscribeToBus();
    });
  };
}

module.exports = Commands;