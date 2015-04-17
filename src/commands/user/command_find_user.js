"use strict";

var util = require("util");
var GenericCommand = require("../generic_command");
var CommandTypes = require("../command_types");
var logger = require("../../utils/log")(__filename);

function CommandFindUser(dependencies) {
  GenericCommand.call(this, dependencies);

  this.commandType = CommandTypes.findUser;

  this.promiseExecution = function (user) {
    return dependencies.warehouses.userWarehouse.promiseToFindForLogin(user.login);
  };
}

util.inherits(CommandFindUser, GenericCommand);

module.exports = CommandFindUser;