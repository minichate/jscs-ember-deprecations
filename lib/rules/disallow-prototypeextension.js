var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowPrototypeExtension';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true,
    this.getOptionName() + ' option requires a true value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  var badIdentifiers = this._identifierIndex;

  file.iterateNodesByType(['CallExpression'], function(node) {
    if (!node.callee.property ||
         (
          node.callee.property.name !== 'property' &&
          node.callee.property.name !== 'observes'
         ) ||
         (
          node.callee.object.type !== 'FunctionExpression') &&
          node.callee.object.type !== 'CallExpression'
         ) {
      return;
    }

    errors.add(
      'Don\'t use the Ember .' + node.callee.property.name + '() prototype extension. Use Ember.computed() instead',
      node.loc.end
    );
  });
};
