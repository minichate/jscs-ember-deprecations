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
    require('./disallow-positionalparams-extend'),
    require('./disallow-beforeobserver'),
    require('./disallow-immediateObserver'),
    require('./disallow-arraycontroller'),
    require('./disallow-controllerneeds'),
    require('./disallow-freezablemixin'),
    require('./disallow-observerargumentsorder'),
    require('./disallow-createwithmixins'),
    require('./disallow-computedany'),
    require('./disallow-handlebarshelpers')
  ];
};
