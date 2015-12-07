var assert = require('assert');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowHandlebarsHelpers';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );
};

module.exports.prototype.check = function(file, errors) {
  file.iterateNodesByType(['Identifier'], function(node) {
    if (node.name !== 'makeBoundHelper') {
      return;
    }

    if (!node.parentNode.object || !node.parentNode.object.property) {
      return;
    }

    if (node.parentNode.object.property.name !== 'HTMLBars') {
      return;
    }

    errors.add(
      'Ember.HTMLBars.makeBoundHelper() is deprecated as of Ember 1.13',
      node.loc.start
    );
  });

  file.iterateNodesByType(['Identifier'], function(node) {
    if (node.name !== 'registerHelper') {
      return;
    }

    if (!node.parentNode.object || !node.parentNode.object.property) {
      return;
    }

    if (node.parentNode.object.property.name !== 'Handlebars') {
      return;
    }

    errors.add(
      'Ember.Handlebars.registerHelper() is deprecated as of Ember 1.13',
      node.loc.start
    );
  });
};
