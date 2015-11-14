var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowEmberTryCatch';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true,
    this.getOptionName() + ' option requires a true value or should be removed'
  );

  this._argumentSize = {
    'tryCatchFinally': 3,
    'tryFinally': 2
  };
};

module.exports.prototype.check = function(file, errors) {
  var _argumentSize = this._argumentSize;

  file.iterateNodesByType(['CallExpression'], function(node) {
    if (!node.callee.property || !_argumentSize[node.callee.property.name]) {
      return;
    }

    var invokedName = node.callee.property.name;

    if (node.arguments.length < _argumentSize[invokedName]) {
      return;
    }

    errors.add(
      'Ember.' + invokedName + ' is deprecated in Ember 1.12',
      node.loc.start
    );
  });
};
