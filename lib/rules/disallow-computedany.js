var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowComputedAny';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  file.iterateNodesByType(['Identifier'], function(node) {
    if (node.name !== 'any') {
      return;
    }

    if (node.parentElement) {
      if (!node.parentElement.object || !node.parentElement.object.property) {
        return;
      }

      if (node.parentElement.object.property.name !== 'computed') {
        return;
      }
    }

    errors.add(
      'Ember.computed.any() is deprecated as of Ember 1.13',
      node
    );
  });
};
