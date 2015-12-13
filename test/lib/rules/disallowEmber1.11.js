describe('lib/rules/disallowEmber1.11', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({'disallowEmber1.11': undefined});
        }).to.throws(/requires a true value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({'disallowEmber1.11': {}});
        }).to.throws(/requires a true value/i);
      });

    });

    describe('with true', function() {
      checker.rules({'disallowEmber1.11': true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should report',
          errors: 1,
          code: function() {
            Ember.ObjectController.foo();
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
