var assert = require('assert');
var EmberCoreHelpers = require('./ember-core');

module.exports = function() {
  this._deprecatedClasses = null;
  this._errorStrings = null;
};

module.exports.prototype.getOptionName = function() {
  throw 'Needs to be implemented';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  this.helpers = new EmberCoreHelpers(file);
  var _this = this;

  var deprecatedClasses = this.getDeprecatedClasses();
  var errorStrings = this.getErrorStrings();
  var errorMap = {};

  deprecatedClasses.forEach(function(clazz, index) {
    errorMap[clazz] = errorStrings[index];
  });

  deprecatedClasses.forEach(function(clazz) {
    _this.helpers.findEmberClass(clazz).forEach(function(node) {
      errors.cast({
        message: errorMap[clazz],
        line: node.getLoc().start.line,
        column: node.getLoc().start.column,
        additional: node
      });
    });
  });
};

module.exports.prototype.getDeprecatedClasses = function() {
  if (this._deprecatedClasses) {
    return this._deprecatedClasses;
  }

  this._deprecatedClasses = this.getDeprecatedClass();
  if (!Array.isArray(this._deprecatedClasses)) {
    this._deprecatedClasses = [this._deprecatedClasses];
  }
  return this.getDeprecatedClasses();
};

module.exports.prototype.getErrorStrings = function() {
  if (this._errorStrings) {
    return this._errorStrings;
  }

  this._errorStrings = this.getErrorString();
  if (!Array.isArray(this._errorStrings)) {
    this._errorStrings = [this._errorStrings];
  }
  return this.getErrorStrings();
};

module.exports.prototype.getErrorString = function() {
  throw 'Needs to be implemented';
};

module.exports.prototype.getDeprecatedClass = function() {
  throw 'Needs to be implemented';
};
