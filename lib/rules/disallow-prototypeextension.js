var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function () {
  return 'disallowPrototypeExtension';
};

module.exports.prototype.configure = function (options) {
  assert(
    options === true,
    this.getOptionName() + ' option requires a true value or should be removed'
  );
};

module.exports.prototype.check = function (file, errors) {
  var badIdentifiers = this._identifierIndex;

  file.iterateNodesByType(['CallExpression'], function(node) {
    if (!node.callee.property || node.callee.property.name !== 'property' || node.callee.object.type !== 'FunctionExpression') {
      return;
    }

    errors.add(
      "Don't use the Ember .property() prototype extension. Use Ember.computed() instead",
      node.loc.end
    );
  });
};
