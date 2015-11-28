module.exports = function(configuration) {
  configuration.registerRule(require('./rules/disallow-objectcontroller'));
  configuration.registerRule(require('./rules/disallow-instanceinitializer'));
  configuration.registerRule(require('./rules/disallow-prototypeextension'));
  configuration.registerRule(require('./rules/disallow-ateachleafnode'));
  configuration.registerRule(require('./rules/disallow-coreview'));
  configuration.registerRule(require('./rules/disallow-embertrycatch'));
  configuration.registerRule(require('./rules/disallow-emberrequired'));
  configuration.registerRule(require('./rules/disallow-arraycomputedpropertyclass'));
  configuration.registerRule(require('./rules/disallow-reducecomputedpropertyclass'));
  configuration.registerRule(require('./rules/disallow-embercreate'));
  configuration.registerRule(require('./rules/disallow-emberkeys'));
  configuration.registerRule(require('./rules/disallow-emberoneway'));
  configuration.registerRule(require('./rules/disallow-emberview'));
  configuration.registerRule(require('./rules/disallow-positionalparams-extend'));
  configuration.registerRule(require('./rules/disallow-beforeobserver'));
  configuration.registerRule(require('./rules/disallow-immediateObserver'));
};
