var deprecatedClass = require('../helpers/deprecated-class');

module.exports = function() {
  deprecatedClass.apply(this, arguments);
};

module.exports.prototype = Object.create(deprecatedClass.prototype);
module.exports.prototype.constructor = deprecatedClass;

module.exports.prototype.getOptionName = function() {
  return 'disallowEmberView';
};

module.exports.prototype.getDeprecatedClass = function() {
  return [
    'View',
    'LinkView',
    'Select',
    'ContainerView',
    'CollectionView'
  ];
};

module.exports.prototype.getErrorString = function() {
  return [
    'Ember.View is deprecated in Ember 1.13',
    'Ember.LinkView is deprecated in Ember 1.13',
    'Ember.Select is deprecated in Ember 1.13',
    'Ember.ContainerView is deprecated in Ember 1.13',
    'Ember.CollectionView is deprecated in Ember 1.13'
  ];
};
