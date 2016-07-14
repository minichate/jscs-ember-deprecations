var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowInitializerArity';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a true value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  if (file.getFilename().indexOf('initializer') < 0) {
    return;
  }

  file.iterateNodesByType('ObjectProperty', function(node) {
    if (node.key.name !== 'initialize') {
      return;
    }

    if (node.value.type === 'Identifier') {
      // this is a reference to a declared variable
      var identifier = node.value.name;

      file.iterateNodesByType('Identifier', function(variable) {
        if (variable.name === identifier && variable.parentElement.init) {
          node = variable.parentElement.init;
        }
      });
    } else {
      node = node.value;
    }

    if (node.type === 'FunctionExpression') {
      if (node.params.length > 1) {
        errors.add(
          'Initializers only take 1 argument in Ember 2.1',
          node
        );
      }
    }
  });
};
