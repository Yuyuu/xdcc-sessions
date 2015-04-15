module.exports = {
  js: {
    files: ["src/**/*.js", "spec/**/*.js"],
    tasks: ["jshint", "mochaTest:watch"]
  }
};