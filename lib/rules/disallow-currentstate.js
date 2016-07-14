var assert = require('assert');
var EmberCoreHelpers = require('../helpers/ember-core');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowCurrentState';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  var ember = new EmberCoreHelpers(file);
  ember.findExtendBlocksProperties('currentState').forEach(function(prop) {
    errors.add(
      '.currentState has been moved to ._currentState and is a private property in Ember 2.1',
      prop
    );
  });

  ember.findExtendBlocksProperties('_currentState').forEach(function(prop) {
    errors.add(
      '._currentState is a private property in Ember 2.1',
      prop
    );
  });
};
