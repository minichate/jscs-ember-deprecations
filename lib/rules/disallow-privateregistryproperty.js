var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowPrivateRegistryProperty';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a true value or should be removed'
  );

  this.map = {
    'resolve': 'resolveRegistration',
    'register': 'register',
    'unregister': 'unregister',
    'has': 'hasRegistration',
    'option': 'registerOption',
    'options': 'registerOptions',
    'getOptions': 'registeredOptions',
    'optionsForType': 'registerOptionsForType',
    'getOptionsForType': 'registeredOptionsForType',
    'injection': 'inject'
  };
};

module.exports.prototype.check = function(file, errors) {
  var _this = this;

  file.iterateNodesByType('MemberExpression', function(node) {
    if (node.property.name !== 'registry' || !node.parentElement.property) {
      return;
    }

    var method = node.parentElement.property.name;
    if (method in _this.map) {
      errors.cast({
        message: 'app.registry.' + method +
          ' is deprecated in Ember 2.1. Use app.' + _this.map[method] +
          ' instead',
        element: node
      });
    }
  });
};
