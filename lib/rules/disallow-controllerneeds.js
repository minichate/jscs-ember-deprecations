var assert = require('assert');
var EmberCoreHelpers = require('../helpers/ember-core');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowControllerNeeds';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true,
    this.getOptionName() + ' option requires a true value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  var ember = new EmberCoreHelpers(file);
  ember.findExtendBlocksProperties('needs').forEach(function(prop) {
    if (prop.value.type !== 'ArrayExpression' && prop.value.type !== 'Literal') {
      return;
    }

    errors.add(
      'needs for controllers are deprecated in Ember 1.13',
      prop.loc.start
    );
  });
};
