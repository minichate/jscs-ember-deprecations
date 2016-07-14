var assert = require('assert');
var EmberCoreHelpers = require('../helpers/ember-core');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowBeforeObserver';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  var helpers = new EmberCoreHelpers(file);

  [
    'addBeforeObserver',
    'removeBeforeObserver',
    'beforeObserversFor'
  ].forEach(function(deprecated) {
    helpers.findEmberFunction(deprecated).forEach(function(node) {
      errors.add(
        'Ember.' + deprecated + ' is deprecated in Ember 1.13',
        node
      );
    });
  });

  file.iterateNodesByType(['CallExpression'], function(node) {
    if (!node.callee.property ||
         (
          node.callee.property.name !== 'observesBefore'
         ) ||
         (
          node.callee.object.type !== 'FunctionExpression') &&
          node.callee.object.type !== 'CallExpression'
         ) {
      return;
    }

    errors.add(
      'The .observesBefore() prototype extension is deprecated in Ember 1.13',
      node
    );
  });
};
