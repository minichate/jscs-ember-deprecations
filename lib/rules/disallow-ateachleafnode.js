var assert = require('assert');

var endsWith = function(string, suffix) {
  if (typeof string === 'string' || string instanceof String) {
    return string.indexOf(suffix, string.length - suffix.length) !== -1;
  }

  return false;
};

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowAtEachLeafNode';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );

  this._callers = [
    'property',
    'observes',
    'observesBefore',
    'computed',
    'observer',
    'addObserver'
  ];
};

module.exports.prototype.check = function(file, errors) {
  var _this = this;

  file.iterateNodesByType(['CallExpression'], function(node) {
    if (node.callee.property && _this._callers.indexOf(node.callee.property.name) < 0) {
      if (node.callee && _this._callers.indexOf(node.callee.name) < 0) {
        return;
      }
    }

    node.arguments.forEach(function(value) {
      if (value.type === 'StringLiteral' && endsWith(value.value, '@each')) {
        errors.add(
          '@each as a leaf node in a dependent key is deprecated in Ember 1.13',
          value
        );
      }
    });
  });
};
