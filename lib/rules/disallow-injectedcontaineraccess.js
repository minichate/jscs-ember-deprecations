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
       (node.parentElement && node.parentElement.object &&  node.parentElement.object.type === 'ThisExpression')) {
      errors.cast({
        message: '.container has been deprecated as of Ember 2.3. Use Ember.getOwner(this) instead.',
        line: node.parentElement.getLoc().start.line,
        column: node.parentElement.getLoc().start.column,
        additional: node
      });
    }
  });
};
