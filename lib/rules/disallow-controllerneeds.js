var assert = require('assert');
var EmberCoreHelpers = require('../helpers/ember-core');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowControllerNeeds';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  var ember = new EmberCoreHelpers(file);
  ember.findExtendBlocksProperties('needs').forEach(function(prop) {
    errors.add(
      'needs for controllers are deprecated in Ember 1.13',
      prop
    );
  });
};
