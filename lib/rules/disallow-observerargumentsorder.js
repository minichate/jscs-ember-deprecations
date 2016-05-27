var assert = require('assert');
var EmberCoreHelpers = require('../helpers/ember-core');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowObserverArgumentOrdering';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  var helpers = new EmberCoreHelpers(file);

  helpers.findEmberFunction('observer').forEach(function(node) {
    if (node.arguments.length === 0 || node.arguments[0].type !== 'FunctionExpression') {
      return;
    }

    errors.add(
      'Ember.observer must take a callable as the final argument as of Ember 1.13',
      node.arguments[0]
    );
  });
};
