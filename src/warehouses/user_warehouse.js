"use strict";

var UserNotFoundError = require("./errors/user_not_found_error");

function UserWarehouse(databaseConnector) {
  var collection = "view_mongouser";

  this.promiseToFindForLogin = function (login) {
    var criteria = {"login": login};
    var promise = databaseConnector.promiseToFindOne(collection, criteria);
    return promise.then(function (user) {
      if (!user) {
        throw new UserNotFoundError(login);
      }
      return user;
    });
  };
}

module.exports = UserWarehouse;