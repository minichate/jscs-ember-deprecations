describe('lib/rules/disallow-embertrycatch', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowEmberCreate: undefined});
        }).to.throws(/requires a true value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowEmberCreate: {}});
        }).to.throws(/requires a true value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowEmberCreate: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.K();
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.create();
          },
          errors: [{
            column: 0, line: 1, filename: 'input', rule: 'disallowEmberCreate', fixed: undefined,
            message: 'Ember.create is deprecated in Ember 1.13'
          }]
        }
        /* jshint ignore:end */
      ]);

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report different import',
          code: "import Em from 'ember';\n" +
                "Ember.create()"
        }, {
          it: 'should report same import',
          code: "import Em from 'ember';\n" +
                "Em.create()",
          errors: 1
        }
        /* jshint ignore:end */
      ]);
    });
});
