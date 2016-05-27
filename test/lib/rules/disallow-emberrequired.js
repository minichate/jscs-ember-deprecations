describe('lib/rules/disallow-emberrequired', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowEmberRequired: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowEmberRequired: {}});
        }).to.throws(/requires a boolean value/i);
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
            column: 8, line: 1, filename: 'input', rule: 'disallowEmberRequired', fixed: undefined,
            message: 'disallowEmberRequired: Ember.required is deprecated in Ember 1.12'
          }]
        }
        /* jshint ignore:end */
      ]);
    });
});
