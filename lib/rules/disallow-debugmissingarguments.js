var assert = require('assert');
var EmberCoreHelpers = require('../helpers/ember-core');

module.exports = function() {};

module.exports.prototype.getOptionName = function() {
  return 'disallowDebugMissingArguments';
};

module.exports.prototype.configure = function(options) {
  assert(
    options === true || options === false,
    this.getOptionName() + ' option requires a boolean value or should be removed'
  );

  this._callers = {
    'deprecateFunc': {args: 3, idpos: 1, name: 'deprecateFunc'},
    'deprecate': {args: 3, idpos: 2, name: 'deprecate'},
    'warn': {args: 3, idpos: 2, name: 'warn'},
    'deprecatingAlias': {args: 2, idpos: 1, name: 'computed.deprecatingAlias'},
  };
};

module.exports.prototype.check = function(file, errors) {
  var _this = this;

  var ember = new EmberCoreHelpers(file);

  var processNode = function(node) {
    var foundId = false;
    var details = _this._callers[node.callee.property.name];

    if (node.arguments.length < details.args) {
      errors.add(
        'Ember.' + details.name +
        ' with only ' + node.arguments.length + ' arguments is deprecated in Ember 2.1. ' +
        'Ensure that the correct argument is an object containing an ' +
        '`id` property',
        node
      );
    } else if (node.arguments[details.idpos].type === 'ObjectExpression') {
      var options = node.arguments[details.idpos];

      options.properties.forEach(function(slot) {
        if (slot.key.name === 'id') {
          foundId = true;
        }
      });

      if (!foundId) {
        errors.add(
          'Ember.' + details.name +
          ' with only ' + node.arguments.length + ' arguments is deprecated in Ember 2.1. ' +
          'Ensure that the correct argument is an object containing an ' +
          '`id` property',
          node
        );
      }
    } else if (node.arguments[details.idpos].type === 'Identifier') {
      file.iterateNodesByType(['Identifier'], function(node) {
        if (node.name !== 'options') {
          return;
        }

        if (!node.parentElement.init) {
          return;
        }

        node.parentElement.init.properties.forEach(function(property) {
          if (property.key.name === 'id') {
            foundId = true;
          }
        });

      });

      if (!foundId) {
        errors.add(
          'Ember.' + details.name +
          ' with only ' + node.arguments.length + ' arguments is deprecated in Ember 2.1. ' +
          'Ensure that the correct argument is an object containing an ' +
          '`id` property',
          node
        );
      }
    }
  };

  ['deprecateFunc', 'deprecate', 'warn'].forEach(function(key) {
    ember.findEmberFunction(key).forEach(processNode);
  });

  file.iterateNodesByType(['CallExpression'], function(node) {
    if (!node.callee.property || node.callee.property.name !== 'deprecatingAlias') {
      return;
    }

    if (!node.callee.object || !node.callee.object.property) {
      return;
    }

    if (node.callee.object.property.name !== 'computed') {
      return;
    }

    processNode(node);
  });

};
