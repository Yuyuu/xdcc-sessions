"use strict";

var Bluebird = require("bluebird");

function MongoConnector(db) {

  this.promiseToFindOne = function (collectionName, criteria) {
    return new Bluebird(function (resolve, reject) {
      var collection = db.collection(collectionName);
      collection.findOne(criteria, function (error, document) {
        if (error) {
          reject(error);
        } else {
          resolve(document);
        }
      });
    });
  };
}

module.exports = MongoConnector;