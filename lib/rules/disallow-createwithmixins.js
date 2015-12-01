var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowCreateWithMixins';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true,
    this.getOptionName() + ' option requires a true value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  file.iterateTokensByTypeAndValue('Identifier', 'createWithMixins', function(token) {
    errors.add(
      'Ember.Object.createWithMixins is deprecated as of Ember 1.13',
      token.loc.start
    );
  });
};
