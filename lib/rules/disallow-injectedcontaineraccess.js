var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowInjectedContainerAccess';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  file.iterateNodesByType('Identifier', function(node) {
    if (node.name === 'container' &&
       (node.parentNode && node.parentNode.object &&  node.parentNode.object.type === 'ThisExpression')) {
      errors.cast({
        message: '.container has been deprecated as of Ember 2.3. Use Ember.getOwner(this) instead.',
        line: node.parentNode.loc.start.line,
        column: node.parentNode.loc.start.column,
        additional: node
      });
    }
  });
};
