describe('lib/rules/disallow-embertrycatch', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowEmberRequired: undefined});
        }).to.throws(/requires a true value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowEmberRequired: {}});
        }).to.throws(/requires a true value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowEmberRequired: true});

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
            Ember.required();
          },
          errors: [{
            column: 0, line: 1, filename: 'input', rule: 'disallowEmberRequired', fixed: undefined,
            message: 'Ember.required is deprecated in Ember 1.12'
          }]
        }
        /* jshint ignore:end */
      ]);

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report different import',
          code: "import Em from 'ember';\n" +
                "Ember.required()"
        }, {
          it: 'should report same import',
          code: "import Em from 'ember';\n" +
                "Em.required()",
          errors: 1
        }
        /* jshint ignore:end */
      ]);
    });
});
