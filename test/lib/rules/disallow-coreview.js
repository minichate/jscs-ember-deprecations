describe('lib/rules/disallow-coreview', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowCoreView: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowCoreView: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowCoreView: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.View.extend({

            });
          }
        }, {
          it: 'should report',
          errors: 1,
          code: function() {
            var foo = Ember.CoreView;
          }
        }, {
          it: 'should report',
          errors: 1,
          code: function() {
            Ember.CoreView.foo();
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.CoreView.extend({

            });
          },
          errors: [{
            column: 0, line: 1, filename: 'input', rule: 'disallowCoreView', fixed: undefined,
            message: 'disallowCoreView: CoreView is deprecated in Ember 1.12'
          }]
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            var foo = Ember.CoreView.create({

            });
          },
          errors: [{
            column: 0, line: 1, filename: 'input', rule: 'disallowCoreView', fixed: undefined,
            message: 'disallowCoreView: CoreView is deprecated in Ember 1.12'
          }]
        }
        /* jshint ignore:end */
      ]);
    });
});
