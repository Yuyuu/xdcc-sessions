"use strict";

var configuration = require("../../utils/configuration");
var Bluebird = require("bluebird");
var MongoClient = require("mongodb").MongoClient;
var MongoConnector = require("./mongo_connector");
var mongoLogger = require("mongodb").Logger;
var logger = require("../../utils/log")(__filename);

function Database() {
  var mongoDb;

  this.promiseToInitialize = function () {
    var self = this;
    return new Bluebird(function (resolve, reject) {
      mongoLogger.setLevel(logLevel());
      MongoClient.connect(url(), function (error, db) {
        if (error) {
          reject("The connection to the database could not be established : " + error.message);
        } else {
          mongoDb = db;
          logger.info("Database connection successful on", mongoDb.options.url);
          resolve(self);
        }
      });
    });
  };

  this.close = function () {
    mongoDb.close();
  };

  this.createConnector = function () {
    return new MongoConnector(mongoDb);
  };

  function url() {
    return configuration.databaseUrl;
  }

  function logLevel() {
    return configuration.databaseLogLevel;
  }
}

module.exports = Database;