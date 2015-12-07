var assert = require('assert');
var EmberCoreHelpers = require('../helpers/ember-core');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowEmberKeys';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true,
    this.getOptionName() + ' option requires a true value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  var helpers = new EmberCoreHelpers(file);

  helpers.findEmberFunction('keys', 0).forEach(function(node) {
    errors.cast({
      message: 'Ember.keys is deprecated in Ember 1.13',
      line: node.callee.property.loc.start.line,
      column: node.callee.property.loc.start.column,
      additional: node
    });
  });
};

module.exports.prototype._fix = function(file, error) {
  var node = error.additional;
  var token = file.getFirstNodeToken(node);

  token.value = 'Object';
};
