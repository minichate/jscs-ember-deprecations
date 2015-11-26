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

  if (!emberImport) {
    emberImport = 'Ember';
  }

  this.file.iterateNodesByType(['Identifier'], function(node) {
    if (node.name === className) {
      if (emberImport && node.parentNode.object.name !== emberImport) {
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

  if (!emberImport) {
    emberImport = 'Ember';
  }

  this.file.iterateNodesByType(['CallExpression'], function(node) {
    if (!node.callee.property || node.callee.property.name !== functionName) {
      return;
    }

    if (node.callee.object.name !== emberImport) {
      return;
    }

    if (args && node.arguments.length < args) {
      return;
    }

    nodes.push(node);
  });

  return nodes;
};

module.exports.prototype.findExtendBlocks = function() {
  var nodes = [];
  var emberImport = this.emberImport();

  if (!emberImport) {
    emberImport = 'Ember';
  }

  this.file.iterateNodesByType(['CallExpression'], function(node) {
    if (node.callee.property.name !== 'extend') {
      return;
    }

    block = node.arguments[node.arguments.length - 1];
    nodes.push(block);
  });

  return nodes;
};

module.exports.prototype.findExtendBlocksProperties = function(key) {
  var properties = [];
  this.findExtendBlocks().forEach(function(block) {
    block.properties.forEach(function(property) {
      if (property.key.name === key) {
        properties.push(property);
      }
    });
  });

  return properties;
};
