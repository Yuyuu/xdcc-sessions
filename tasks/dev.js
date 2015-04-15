"use strict";

module.exports = function (grunt) {

  grunt.registerTask("dev", function () {
    grunt.task.run(["jshint", "mochaTest:console", "watch"]);
  });
};