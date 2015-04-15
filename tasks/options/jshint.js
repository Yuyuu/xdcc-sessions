module.exports = {
  all: ["src/**/*.js", "spec/**/*.js"],
  options: {
    jshintrc: ".jshintrc",
    reporter: require("jshint-stylish")
  }
};