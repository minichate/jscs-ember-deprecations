var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowAppInstanceContainer';
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
      var appInstance = node.params[0];
      if (!appInstance) {
        return;
      }

      file.iterateNodesByType('MemberExpression', function(member) {
        var variable = member.object;

        if (variable.name === appInstance.name) {
          if (member.property.name === 'container') {
            errors.cast({
              message: 'application.container.lookup is deprecated in Ember 2.1',
              line: member.property.getLoc().start.line,
              column: member.property.getLoc().start.column,
              additional: member.property
            });
          }
        }
      });
    }
  });
};
