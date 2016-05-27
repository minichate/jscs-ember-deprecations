var assert = require('assert');
var EmberCoreHelpers = require('../helpers/ember-core');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowDefaultLayout';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  var ember = new EmberCoreHelpers(file);
  ember.findExtendBlocksProperties('defaultLayout').forEach(function(prop) {
    errors.add(
      'defaultLayout on Components are deprecated in Ember 2.1',
      prop
    );
  });
};
