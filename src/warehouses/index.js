"use strict";

var UserWarehouse = require("./user_warehouse");

function Warehouses(databaseConnector) {
  this.userWarehouse = new UserWarehouse(databaseConnector);
}

module.exports = Warehouses;