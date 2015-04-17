"use strict";

var Bluebird = require("bluebird");
var logger = require("./log")(__filename);

function CommandBus() {
  var subscribers = {};

  this.promisePropagation = function (commandType) {
    logger.debug("Propagation of command", commandType);
    var subscriber = subscribers[commandType];
    if (!subscriber) {
      return rejectBecauseOfNoSubscriber(commandType);
    }
    return subscriber.promiseExecution.apply(subscriber, Array.prototype.slice.call(arguments, 1));
  };

  function rejectBecauseOfNoSubscriber(commandType) {
    return Bluebird.reject(new Error("There is no subscriber for command " + commandType));
  }

  this.subscribe = function (commandType, command) {
    logger.debug("Subscribing to command", commandType);
    if (subscribers[commandType]) {
      throw new Error("There is already a subscriber for the command " + commandType);
    }
    subscribers[commandType] = command;
  };
}

module.exports = CommandBus;