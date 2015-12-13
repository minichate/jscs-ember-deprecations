var GroupRules = require('../helpers/group-rules');

module.exports = function() {
  GroupRules.apply(this, arguments);
};

module.exports.prototype = Object.create(GroupRules.prototype);
module.exports.prototype.constructor = GroupRules;

module.exports.prototype.getOptionName = function() {
  return 'disallowEmber1.11';
};

module.exports.prototype.rules = function() {
  return [
    require('./disallow-objectcontroller'),
    require('./disallow-instanceinitializer')
  ];
};
