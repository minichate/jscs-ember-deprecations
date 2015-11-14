module.exports = function(configuration) {
  configuration.registerRule(require('./rules/disallow-objectcontroller'));
  configuration.registerRule(require('./rules/disallow-instanceinitializer'));
  configuration.registerRule(require('./rules/disallow-prototypeextension'));
  configuration.registerRule(require('./rules/disallow-ateachleafnode'));
  configuration.registerRule(require('./rules/disallow-coreview'));
  configuration.registerRule(require('./rules/disallow-embertrycatch'));
};
