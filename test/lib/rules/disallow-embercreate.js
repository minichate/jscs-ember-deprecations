describe('lib/rules/disallow-embercreate', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowEmberCreate: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowEmberCreate: {}});
        }).to.throws(/requires a boolean value/i);
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
            column: 7, line: 1, filename: 'input', rule: 'disallowEmberCreate', fixed: undefined,
            message: 'disallowEmberCreate: Ember.create is deprecated in Ember 1.13'
          }]
        }
        /* jshint ignore:end */
      ]);
    });
});
