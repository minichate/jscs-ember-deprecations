var deprecatedClass = require('../helpers/deprecated-class');

module.exports = function() {
  deprecatedClass.apply(this, arguments);
};

module.exports.prototype = Object.create(deprecatedClass.prototype);
module.exports.prototype.constructor = deprecatedClass;

module.exports.prototype.getOptionName = function() {
  return 'disallowArrayController';
};

module.exports.prototype.getDeprecatedClass = function() {
  return 'ArrayController';
};

module.exports.prototype.getErrorString = function() {
  return 'ArrayController is deprecated in Ember 1.13';
};
