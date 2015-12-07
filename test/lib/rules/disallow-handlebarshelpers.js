describe('lib/rules/disallow-handlebarshelpers', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowHandlebarsHelpers: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowHandlebarsHelpers: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowHandlebarsHelpers: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report Ember.Helper.helper()',
          code: function() {
            Ember.Helper.helper(function(firstArg, secondArg, hash) {
              // helper code
            });
          }
        }, {
          it: 'should not report Ember.Foobars.registerHelper()',
          code: function() {
            Ember.Foobars.registerHelper('foo-bar', function(firstArg, secondArg, options) {
              // helper code
            });
          }
        }, {
          it: 'should not report bare registerHelper()',
          code: function() {
            registerHelper('foo-bar');
          }
        }, {
          it: 'should not report bare makeBoundHelper()',
          code: function() {
            makeBoundHelper('foo-bar');
          }
        }, {
          it: 'should not report Ember.Foobars.makeBoundHelper()',
          code: function() {
            Ember.Foobars.makeBoundHelper(function(firstArg, secondArg, options) {
              // helper code
            });
          }
        }, {
          it: 'should report Ember.Handlebars.registerHelper()',
          errors: 1,
          code: function() {
            Ember.Handlebars.registerHelper('foo-bar', function(firstArg, secondArg, options) {
              // helper code
            });
          }
        }, {
          it: 'should report Ember.HTMLBars.makeBoundHelper()',
          errors: 1,
          code: function() {
            Ember.HTMLBars.makeBoundHelper(function(firstArg, secondArg, options) {
              // helper code
            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
