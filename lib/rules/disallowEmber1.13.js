var GroupRules = require('../helpers/group-rules');

module.exports = function() {
  GroupRules.apply(this, arguments);
};

module.exports.prototype = Object.create(GroupRules.prototype);
module.exports.prototype.constructor = GroupRules;

module.exports.prototype.getOptionName = function() {
  return 'disallowEmber1.13';
};

module.exports.prototype.rules = function() {
  return [
    require('./disallow-ateachleafnode'),
    require('./disallow-arraycomputedpropertyclass'),
    require('./disallow-reducecomputedpropertyclass'),
    require('./disallow-embercreate'),
    require('./disallow-emberkeys'),
    require('./disallow-emberoneway'),
    require('./disallow-emberview'),
    require('./rules/disallow-positionalparams-extend'),
    require('./rules/disallow-beforeobserver'),
    require('./rules/disallow-immediateObserver'),
    require('./rules/disallow-arraycontroller'),
    require('./rules/disallow-controllerneeds'),
    require('./rules/disallow-freezablemixin'),
    require('./rules/disallow-observerargumentsorder'),
    require('./rules/disallow-createwithmixins'),
    require('./rules/disallow-computedany'),
    require('./rules/disallow-handlebarshelpers')
  ];
};
