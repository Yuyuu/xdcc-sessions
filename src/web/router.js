"use strict";

var PromiseRouter = require("express-promise-router");
var Resources = require("./resources");

function Router(dependencies) {
  var resources = new Resources(dependencies);

  this.configure = function (application) {
    var router = new PromiseRouter();

    router.post("/", resources.authenticationResource.promiseToAuthenticate);

    router.get("/", function (resquest, response) {
      response.status(200).end();
    });

    application.use(router);
  };
}

module.exports = Router;