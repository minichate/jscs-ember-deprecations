describe('lib/rules/disallow-objectcontroller', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowObjectController: undefined});
        }).to.throws(/requires a true value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowObjectController: {}});
        }).to.throws(/requires a true value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowObjectController: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.Controller.extend({

            });
          }
        }, {
          it: 'should not report',
          code: function() {
            var foo = Ember.ObjectController;
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.ObjectController.extend({

            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            var foo = Ember.ObjectController.create({

            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
