module.exports = function(file) {
  this.file = file;
};

module.exports.prototype.emberImport = function() {
  var found = false;

  this.file.iterateNodesByType(['ImportDeclaration'], function(node) {
    if (!node.source || node.source.value !== 'ember') {
      return;
    }

    var specifiers = node.specifiers;
    if (!specifiers || specifiers.length != 1) {
      return;
    }

    if (specifiers[0].local) {
      found = specifiers[0].local.name;
    }
  });

  return found;
};

module.exports.prototype.findEmberClass = function(className) {
  var nodes = [];
  var _this = this;
  var emberImport = this.emberImport();

  this.file.iterateNodesByType(['Identifier'], function(node) {
    if (node.name === className) {
      if (emberImport && node.parentNode.object.name !== emberImport) {
        return;
      }

      if (node.parentNode.object.name !== 'Ember') {
        return;
      }

      var nextToken = _this.file.getTokenByRangeStart(node.range[1]);
      if (nextToken.type !== 'Punctuator' || nextToken.value !== '.') {
        return;
      }

      var following = _this.file.getTokenByRangeStart(nextToken.range[1]);
      if (following.value !== 'extend' && following.value !== 'create') {
        return;
      }

      nodes.push(node);
    }
  });

  return nodes;
};

module.exports.prototype.findEmberFunction = function(functionName, args) {
  var nodes = [];
  var emberImport = this.emberImport();

  this.file.iterateNodesByType(['CallExpression'], function(node) {
    if (!node.callee.property || node.callee.property.name !== functionName) {
      return;
    }

    if (emberImport && node.callee.object.name !== emberImport) {
      return;
    } else if (node.callee.object.name !== 'Ember') {
      return;
    }

    if (args && node.arguments.length < args) {
      return;
    }

    nodes.push(node);
  });

  return nodes;
};
