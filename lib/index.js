module.exports = function(configuration) {
  configuration.registerRule(require('./rules/disallow-objectcontroller'));
  configuration.registerRule(require('./rules/disallow-instanceinitializer'));
};
