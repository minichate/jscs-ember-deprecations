var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function () {
  return 'disallowObjectController';
};

module.exports.prototype.configure = function (options) {
  assert(
    options === true,
    this.getOptionName() + ' option requires a true value or should be removed'
  );

  this._identifierIndex = {
    'ObjectController': true
  };
};

module.exports.prototype.check = function (file, errors) {
  var disallowedIdentifiers = this._identifierIndex;

  file.iterateNodesByType(['Identifier'], function(node) {
    if (Object.prototype.hasOwnProperty.call(disallowedIdentifiers, node.name)) {
      errors.add('ObjectController is deprecated in Ember 1.11', node.loc.start);
    }
  });
};
