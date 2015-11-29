var deprecatedClass = require('../helpers/deprecated-class');

module.exports = function() {
  deprecatedClass.apply(this, arguments);
};

module.exports.prototype = Object.create(deprecatedClass.prototype);
module.exports.prototype.constructor = deprecatedClass;

module.exports.prototype.getOptionName = function() {
  return 'disallowFreezableMixin';
};

module.exports.prototype.getDeprecatedClass = function() {
  return 'Freezable';
};

module.exports.prototype.getErrorString = function() {
  return 'Ember.Freezable mixin is deprecated in Ember 1.13';
};
