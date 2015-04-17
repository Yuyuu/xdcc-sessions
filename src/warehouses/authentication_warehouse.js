"use strict";

function AuthenticationWarehouse(databaseConnector, collection) {

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

module.exports = AuthenticationWarehouse;