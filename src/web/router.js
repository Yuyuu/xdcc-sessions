"use strict";

var PromiseRouter = require("express-promise-router");
var Resources = require("./resources");

function Router(dependencies) {
  var resources = new Resources(dependencies);

  this.configure = function (application) {
    var router = new PromiseRouter();

    router.post("/", resources.authenticationResource.postPromise);

    application.get("/", function (resquest, response) {
      response.status(200).send("Sessions app server.");
    });

    application.use(router);
  };
}

module.exports = Router;