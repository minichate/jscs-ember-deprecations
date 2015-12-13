var assert = require('assert');

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
  this.rules().forEach(function(RuleContructor) {
    var rule = new RuleContructor();
    rule.check(file, errors);
  });
};

module.exports.prototype.rules = function() {
  throw 'Needs to be implemented';
};
