describe('lib/rules/disallowEmber111', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowEmber111: undefined});
        }).to.throws(/requires a true value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowEmber111: {}});
        }).to.throws(/requires a true value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowEmber111: true});

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
