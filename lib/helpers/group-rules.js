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

  this.options = options;
};

module.exports.prototype.check = function(file, errors) {
  var _this = this;

  this.rules().forEach(function(RuleContructor) {
    var rule = new RuleContructor();
    rule.configure(_this.options);
    rule.check(file, errors);
  });
};

module.exports.prototype.rules = function() {
  throw 'Needs to be implemented';
};
