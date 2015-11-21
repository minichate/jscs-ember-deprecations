var deprecatedClass = require('../helpers/deprecated-class');

module.exports = function() {
  deprecatedClass.apply(this, arguments);
};

module.exports.prototype = Object.create(deprecatedClass.prototype);
module.exports.prototype.constructor = deprecatedClass;

module.exports.prototype.getOptionName = function() {
  return 'disallowCoreView';
};

module.exports.prototype.getDeprecatedClass = function() {
  return 'CoreView';
};

module.exports.prototype.getErrorString = function() {
  return 'CoreView is deprecated in Ember 1.12';
};
