var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowEmber111';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true,
    this.getOptionName() + ' option requires a true value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  var rules = [
    require('./disallow-objectcontroller'),
    require('./disallow-instanceinitializer')
  ];

  rules.forEach(function(RuleContructor) {
    var rule = new RuleContructor();
    rule.check(file, errors);
  });

};
