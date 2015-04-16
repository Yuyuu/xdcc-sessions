"use strict";

function Router() {
  this.configure = function (application) {
    application.get("/", function (resquest, response) {
      response.status(200).send("Sessions app server.");
    });
  };
}

module.exports = Router;