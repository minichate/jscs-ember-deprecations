// jshint undef:false

var EmberCore = require('../../../lib/helpers/ember-core');
var JsFile = require('jscs/lib/js-file');
var createFixtureLoader = require('fixture-loader');
var assert = require('assert');

describe('lib/helpers/ember-core', function() {
  global.checker({
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
        filename: 'basic.fixture'
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
      assert(17 === viewClasses[0].getLoc().start.line);
      assert(24 === viewClasses[0].getLoc().start.column);
      assert(17 === viewClasses[0].getLoc().end.line);
      assert(28 === viewClasses[0].getLoc().end.column);

      // App.StudentView
      assert(21 === viewClasses[1].getLoc().start.line);
      assert(24 === viewClasses[1].getLoc().start.column);
      assert(21 === viewClasses[1].getLoc().end.line);
      assert(28 === viewClasses[1].getLoc().end.column);

      // App.StudentView.emptyView
      assert(23 === viewClasses[2].getLoc().start.line);
      assert(21 === viewClasses[2].getLoc().start.column);
      assert(23 === viewClasses[2].getLoc().end.line);
      assert(25 === viewClasses[2].getLoc().end.column);
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
      assert('ObjectProperty' === property.type);
      assert('students' === property.key.name);
      assert('Identifier' === property.key.type);
      assert('NullLiteral' === property.value.type);
    });
  });

  describe('basic ember application with no ES6 imports', function() {
    beforeEach(function() {
      var fixture = fixtureLoader.loadString(BASE_PATH, 'basic-no-import.fixture');
      var file = new JsFile({
        source: fixture,
        filename: 'basic-no-import.fixture'
      });
      ember = new EmberCore(file);
    });

    it('should find Ember classes', function() {
      var viewClasses = ember.findEmberClass('View');
      assert(3 === viewClasses.length);

      // App.TeacherView
      assert(15 === viewClasses[0].getLoc().start.line);
      assert(24 === viewClasses[0].getLoc().start.column);
      assert(15 === viewClasses[0].getLoc().end.line);
      assert(28 === viewClasses[0].getLoc().end.column);

      // App.StudentView
      assert(19 === viewClasses[1].getLoc().start.line);
      assert(24 === viewClasses[1].getLoc().start.column);
      assert(19 === viewClasses[1].getLoc().end.line);
      assert(28 === viewClasses[1].getLoc().end.column);

      // App.StudentView.emptyView
      assert(21 === viewClasses[2].getLoc().start.line);
      assert(21 === viewClasses[2].getLoc().start.column);
      assert(21 === viewClasses[2].getLoc().end.line);
      assert(25 === viewClasses[2].getLoc().end.column);
    });

    it('should find .extend() blocks', function() {
      assert(6 === ember.findExtendBlocks().length);
    });

    it('should find properties in .extend() blocks', function() {
      var properties = ember.findExtendBlocksProperties('students');
      assert(1 === properties.length);

      var property = properties[0];
      assert('ObjectProperty' === property.type);
      assert('students' === property.key.name);
      assert('Identifier' === property.key.type);
      assert('NullLiteral' === property.value.type);
    });
  });

  describe('malformed ember import', function() {
    beforeEach(function() {
      var fixture = fixtureLoader.loadString(BASE_PATH, 'bad-import.fixture');
      var file = new JsFile({
        source: fixture,
        filename: 'bad-import.fixture'
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
        filename: 'em-import.fixture'
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
        filename: 'multiple-ember-import.fixture'
      });
      ember = new EmberCore(file);
    });

    it('should find Ember import statement', function() {
      assert(ember.emberImport() === false);
    });
  });

  describe('ember mixin', function() {
    beforeEach(function() {
      var fixture = fixtureLoader.loadString(BASE_PATH, 'mixin.fixture');
      var file = new JsFile({
        source: fixture,
        filename: 'mixin.fixture'
      });
      ember = new EmberCore(file);
    });

    it('should not find nonexistant properties in .extend() blocks', function() {
      var properties = ember.findExtendBlocksProperties('students');
      assert(0 === properties.length);
    });
  });
});
