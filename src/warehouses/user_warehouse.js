"use strict";

function UserWarehouse(databaseConnector) {
  var collection = "view_mongouser";

  this.promiseToFindForLogin = function (login) {
    var criteria = {"login": login};
    var promise = databaseConnector.promiseToFindOne(collection, criteria);
    return promise.then(function (user) {
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    });
  };
}

module.exports = UserWarehouse;