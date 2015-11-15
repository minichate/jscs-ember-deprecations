var assert = require('assert');
var EmberCoreHelpers = require('./ember-core');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  throw 'Needs to be implemented';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true,
    this.getOptionName() + ' option requires a true value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  var helpers = new EmberCoreHelpers(file);
  var _this = this;

  helpers.findEmberClass(this.getDeprecatedClass()).forEach(function(node) {
    errors.add(
      _this.getErrorString(node),
      node.loc.start
    );
  });
};

module.exports.prototype.getErrorString = function(node) {
  throw 'Needs to be implemented';
};
