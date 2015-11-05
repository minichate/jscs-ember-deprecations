var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function () {
  return 'disallowInstanceInInitializer';
};

module.exports.prototype.configure = function (options) {
  assert(
    options === true,
    this.getOptionName() + ' option requires a true value or should be removed'
  );
};

module.exports.prototype.check = function (file, errors) {
  file.iterateNodesByType('CallExpression', function(node) {
    if (!node.callee.property || node.callee.property.name !== 'lookup') {
      return;
    }

    var initializeNode = node.parentNode;

    while (initializeNode) {
      if (initializeNode.type === 'Property' && initializeNode.key.name === 'initialize') {
        break;
      }

      initializeNode = initializeNode.parentNode;
    }

    if (!initializeNode) {
      return;
    }

    var initializerNode = initializeNode.parentNode;
    while (initializerNode) {
      if (initializerNode.type === 'CallExpression' && initializerNode.callee.property.name === 'initializer') {
        break;
      }

      initializerNode = initializerNode.parentNode;
    }

    if (!initializerNode) {
      return;
    }

    errors.add(
      'Instances in initializers are deprecated in Ember 1.11',
      node.loc.start
    );
  });
};
