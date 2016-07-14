var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowPrototypeExtension';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );

  this._fixes = {
    'property': 'Ember.computed()',
    'observes': 'Ember.observer()',
    'observesBefore': 'addObserver'
  };
};

module.exports.prototype.check = function(file, errors) {
  var _this = this;

  file.iterateNodesByType(['CallExpression'], function(node) {
    if (!node.callee.property ||
         (
          node.callee.property.name !== 'property' &&
          node.callee.property.name !== 'observes' &&
          node.callee.property.name !== 'observesBefore'
         ) ||
         (
          node.callee.object.type !== 'FunctionExpression') &&
          node.callee.object.type !== 'CallExpression'
         ) {
      return;
    }

    var name = node.callee.property.name;
    var fixes = _this._fixes[name];

    errors.add(
      'Don\'t use the Ember .' + name + '() prototype extension. Use ' + fixes + ' instead',
      node.callee.property
    );
  });
};
