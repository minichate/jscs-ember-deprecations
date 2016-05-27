describe('lib/rules/disallow-embertrycatch', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowEmberTryCatch: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowEmberTryCatch: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowEmberTryCatch: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.K();
          }
        }, {
          it: 'should not report',
          code: function() {
            Foo.tryCatchFinally(a);
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            var c = function() {};
            var a, b;
            a = b = c;

            Ember.tryCatchFinally(a, b, c);
          },
          errors: [{
            column: 15, line: 5, filename: 'input', rule: 'disallowEmberTryCatch', fixed: undefined,
            message: 'disallowEmberTryCatch: Ember.tryCatchFinally is deprecated in Ember 1.12'
          }]
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            var b = function() {};
            var a = c;

            Ember.tryFinally(a, b);
          },
          errors: [{
            column: 11, line: 4, filename: 'input', rule: 'disallowEmberTryCatch', fixed: undefined,
            message: 'disallowEmberTryCatch: Ember.tryFinally is deprecated in Ember 1.12'
          }]
        }
        /* jshint ignore:end */
      ]);
    });
});
