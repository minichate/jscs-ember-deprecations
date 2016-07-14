var assert = require('assert');
var EmberCoreHelpers = require('../helpers/ember-core');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowEmberRequired';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  var helpers = new EmberCoreHelpers(file);

  helpers.findEmberFunction('required', 0).forEach(function(node) {
    errors.add(
      'Ember.required is deprecated in Ember 1.12',
      node
    );
  });
};
