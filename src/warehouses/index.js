"use strict";

var AuthenticationWarehouse = require("./authentication_warehouse");

function Warehouses(databaseConnector) {
  this.authenticationWarehouse = new AuthenticationWarehouse(databaseConnector);
}

module.exports = Warehouses;