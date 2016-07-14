var assert = require('assert');
var EmberCoreHelpers = require('../helpers/ember-core');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowDualGetterSetter';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  var helpers = new EmberCoreHelpers(file);

  helpers.findEmberFunction('computed', 1).forEach(function(node) {
    var lastArg = node.arguments[node.arguments.length - 1];

    if (lastArg.type !== 'FunctionExpression') {
      return;
    }

    if (lastArg.params.length > 0) {
      errors.add(
        'Ember.computed() properties with shared setter/getter is deprecated as of Ember 1.12',
        lastArg
      );
    }
  });
};
