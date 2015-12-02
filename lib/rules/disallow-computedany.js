var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowComputedAny';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true,
    this.getOptionName() + ' option requires a true value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  file.iterateNodesByType(['Identifier'], function(node) {
    if (node.name !== 'any') {
      return;
    }

    if (!node.parentNode.object || !node.parentNode.object.property) {
      return;
    }

    if (node.parentNode.object.property.name !== 'computed') {
      return;
    }

    errors.add(
      'Ember.computed.any() is deprecated as of Ember 1.13',
      node.loc.start
    );
  });
};
