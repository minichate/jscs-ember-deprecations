var EmberCore = require('../../../lib/helpers/ember-core');
var JsFile = require('jscs/lib/js-file');
var createFixtureLoader = require('fixture-loader');
var esprima = require('esprima');
var assert = require('assert');

describe('lib/helpers/ember-core', function() {
  var checker = global.checker({
    plugins: ['./lib/index']
  });

  beforeEach(function() {
    fixtureLoader = createFixtureLoader.create(__dirname, '../../fixtures');
    BASE_PATH = './ember';
  });

  describe('basic ember application', function() {
    beforeEach(function() {
      var fixture = fixtureLoader.loadString(BASE_PATH, 'basic.fixture');
      var file = new JsFile({
        source: fixture,
        filename: 'basic.fixture',
        esprima: esprima
      });
      ember = new EmberCore(file);
    });

    it('should find Ember import statement', function() {
      assert(ember.emberImport() === 'Ember');
    });

    it('should find Ember classes', function() {
      var viewClasses = ember.findEmberClass('View');

      assert(3 === viewClasses.length);

      // App.TeacherView
      assert(17 === viewClasses[0].loc.start.line);
      assert(24 === viewClasses[0].loc.start.column);
      assert(17 === viewClasses[0].loc.end.line);
      assert(28 === viewClasses[0].loc.end.column);

      // App.StudentView
      assert(21 === viewClasses[1].loc.start.line);
      assert(24 === viewClasses[1].loc.start.column);
      assert(21 === viewClasses[1].loc.end.line);
      assert(28 === viewClasses[1].loc.end.column);

      // App.StudentView.emptyView
      assert(23 === viewClasses[2].loc.start.line);
      assert(21 === viewClasses[2].loc.start.column);
      assert(23 === viewClasses[2].loc.end.line);
      assert(25 === viewClasses[2].loc.end.column);
    });

    it('should find Ember helper functions', function() {
      var keys = ember.findEmberFunction('keys', 0);
      assert(1 === keys.length);
    });

    it('should not find Ember helper functions if argument length not match', function() {
      var keys = ember.findEmberFunction('keys', 10);
      assert(0 === keys.length);
    });

    it('should find .extend() blocks', function() {
      assert(6 === ember.findExtendBlocks().length);
    });

    it('should find properties in .extend() blocks', function() {
      var properties = ember.findExtendBlocksProperties('students');
      assert(1 === properties.length);

      var property = properties[0];
      assert('Property' === property.type);
      assert('students' === property.key.name);
      assert('Identifier' === property.key.type);
      assert(null === property.value.value);
    });
  });

  describe('basic ember application with no ES6 imports', function() {
    beforeEach(function() {
      var fixture = fixtureLoader.loadString(BASE_PATH, 'basic-no-import.fixture');
      var file = new JsFile({
        source: fixture,
        filename: 'basic-no-import.fixture',
        esprima: esprima
      });
      ember = new EmberCore(file);
    });

    it('should find Ember classes', function() {
      var viewClasses = ember.findEmberClass('View');
      assert(3 === viewClasses.length);

      // App.TeacherView
      assert(15 === viewClasses[0].loc.start.line);
      assert(24 === viewClasses[0].loc.start.column);
      assert(15 === viewClasses[0].loc.end.line);
      assert(28 === viewClasses[0].loc.end.column);

      // App.StudentView
      assert(19 === viewClasses[1].loc.start.line);
      assert(24 === viewClasses[1].loc.start.column);
      assert(19 === viewClasses[1].loc.end.line);
      assert(28 === viewClasses[1].loc.end.column);

      // App.StudentView.emptyView
      assert(21 === viewClasses[2].loc.start.line);
      assert(21 === viewClasses[2].loc.start.column);
      assert(21 === viewClasses[2].loc.end.line);
      assert(25 === viewClasses[2].loc.end.column);
    });
  });

  describe('malformed ember import', function() {
    beforeEach(function() {
      var fixture = fixtureLoader.loadString(BASE_PATH, 'bad-import.fixture');
      var file = new JsFile({
        source: fixture,
        filename: 'bad-import.fixture',
        esprima: esprima
      });
      ember = new EmberCore(file);
    });

    it('should not find Ember import statement', function() {
      assert(ember.emberImport() === false);
    });
  });

  describe('unconventional ember import', function() {
    beforeEach(function() {
      var fixture = fixtureLoader.loadString(BASE_PATH, 'em-import.fixture');
      var file = new JsFile({
        source: fixture,
        filename: 'em-import.fixture',
        esprima: esprima
      });
      ember = new EmberCore(file);
    });

    it('should find Ember import statement', function() {
      assert(ember.emberImport() === 'Em');
    });

    it('should not find Ember classes', function() {
      var viewClasses = ember.findEmberClass('View');
      assert(0 === viewClasses.length);
    });
  });

  describe('multiple ember import', function() {
    beforeEach(function() {
      var fixture = fixtureLoader.loadString(BASE_PATH, 'multiple-ember-import.fixture');
      var file = new JsFile({
        source: fixture,
        filename: 'multiple-ember-import.fixture',
        esprima: esprima
      });
      ember = new EmberCore(file);
    });

    it('should find Ember import statement', function() {
      assert(ember.emberImport() === false);
    });
  });
});
