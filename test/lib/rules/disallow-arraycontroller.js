describe('lib/rules/disallow-arraycontroller', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowArrayController: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowArrayController: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowArrayController: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.Controller.extend({

            });
          }
        }, {
          it: 'should report',
          errors: 1,
          code: function() {
            var foo = Ember.ArrayController;
          }
        }, {
          it: 'should report',
          errors: 1,
          code: function() {
            Ember.ArrayController.foo();
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.ArrayController.extend({

            });
          },
          errors: [{
            column: 0, line: 1, filename: 'input', rule: 'disallowArrayController', fixed: undefined,
            message: 'disallowArrayController: ArrayController is deprecated in Ember 1.13'
          }]
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            var foo = Ember.ArrayController.create({

            });
          },
          errors: [{
            column: 0, line: 1, filename: 'input', rule: 'disallowArrayController', fixed: undefined,
            message: 'disallowArrayController: ArrayController is deprecated in Ember 1.13'
          }]
        }
        /* jshint ignore:end */
      ]);
    });
});
