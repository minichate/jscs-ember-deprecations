var assert = require('assert');
var EmberCoreHelpers = require('../helpers/ember-core');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowEmberOneway';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true,
    this.getOptionName() + ' option requires a true value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  var helpers = new EmberCoreHelpers(file);

  helpers.findEmberFunction('oneWay', 0).forEach(function(node) {
    if (node.callee.object &&
        node.callee.object.property &&
        node.callee.object.property.name === 'computed') {
      return;
    }
    errors.add(
      'Ember.oneWay is deprecated in Ember 1.13',
      node.loc.start
    );
  });
};
