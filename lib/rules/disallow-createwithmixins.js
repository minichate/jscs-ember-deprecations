var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowCreateWithMixins';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  file.iterateNodesByType(['Identifier'], function(node) {
    if (node.name !== 'createWithMixins') {
      return;
    }

    errors.add(
      'Ember.Object.createWithMixins is deprecated as of Ember 1.13',
      node
    );
  });
};
