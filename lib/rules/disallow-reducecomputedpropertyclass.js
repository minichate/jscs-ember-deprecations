var deprecatedClass = require('../helpers/deprecated-class');

module.exports = function() {
  deprecatedClass.apply(this, arguments);
};

module.exports.prototype = Object.create(deprecatedClass.prototype);
module.exports.prototype.constructor = deprecatedClass;

module.exports.prototype.getOptionName = function() {
  return 'disallowReduceComputed';
};

module.exports.prototype.getDeprecatedClass = function() {
  return 'ReduceComputedProperty';
};

module.exports.prototype.check = function(file, errors) {
  deprecatedClass.prototype.check.call(this, file, errors);

  this.helpers.findEmberFunction('reduceComputed', 0).forEach(function(node) {
    errors.add(
      'Ember.reduceComputed is deprecated in Ember 1.13',
      node
    );
  });
};

module.exports.prototype.getErrorString = function() {
  return 'ReduceComputedProperty is deprecated in Ember 1.13';
};
