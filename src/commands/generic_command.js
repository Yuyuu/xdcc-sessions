"use strict";

function GenericCommand(dependencies) {
  this.commandType = undefined;

  this.promiseExecution = function () {
    throw new Error(undefined);
  };

  this.subscribeToBus = function () {
    dependencies.commandBus.subscribe(this.commandType, this);
  };
}

module.exports = GenericCommand;