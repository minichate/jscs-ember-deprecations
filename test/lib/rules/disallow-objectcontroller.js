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
          it: 'should not report',
          code: function() {
            Ember.ObjectController.foo();
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.ObjectController.extend({

            });
          },
          errors: [{
            column: 6, line: 1, filename: 'input', rule: 'disallowObjectController', fixed: undefined,
            message: 'ObjectController is deprecated in Ember 1.11'
          }]
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            var foo = Ember.ObjectController.create({

            });
          },
          errors: [{
            column: 16, line: 1, filename: 'input', rule: 'disallowObjectController', fixed: undefined,
            message: 'ObjectController is deprecated in Ember 1.11'
          }]
        }
        /* jshint ignore:end */
      ]);

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report different import',
          code: "import Em from 'ember';\n" +
                "Ember.ObjectController.create()"
        }, {
          it: 'should report same import',
          code: "import Em from 'ember';\n" +
                "Em.ObjectController.create()",
          errors: 1
        }
        /* jshint ignore:end */
      ]);
    });
});
