var deprecatedClass = require('../helpers/deprecated-class');

module.exports = function() {
  deprecatedClass.apply(this, arguments);
};

module.exports.prototype = Object.create(deprecatedClass.prototype);
module.exports.prototype.constructor = deprecatedClass;

module.exports.prototype.getOptionName = function() {
  return 'disallowArrayComputed';
};

module.exports.prototype.getDeprecatedClass = function() {
  return 'ArrayComputedProperty';
};

module.exports.prototype.check = function(file, errors) {
  deprecatedClass.prototype.check.call(this, file, errors);

  this.helpers.findEmberFunction('arrayComputed', 0).forEach(function(node) {
    errors.add(
      'Ember.arrayComputed is deprecated in Ember 1.13',
      node.loc.start
    );
  });
};

module.exports.prototype.getErrorString = function(node) {
  return 'ArrayComputedProperty is deprecated in Ember 1.13';
};