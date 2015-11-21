var deprecatedClass = require('../helpers/deprecated-class');

module.exports = function() {
  deprecatedClass.apply(this, arguments);
};

module.exports.prototype = Object.create(deprecatedClass.prototype);
module.exports.prototype.constructor = deprecatedClass;

module.exports.prototype.getOptionName = function() {
  return 'disallowObjectController';
};

module.exports.prototype.getDeprecatedClass = function() {
  return 'ObjectController';
};

module.exports.prototype.getErrorString = function() {
  return 'ObjectController is deprecated in Ember 1.11';
};
