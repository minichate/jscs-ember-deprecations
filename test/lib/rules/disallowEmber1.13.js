describe('lib/rules/disallowEmber1.13', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({'disallowEmber1.13': undefined});
        }).to.throws(/requires a true value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({'disallowEmber1.13': {}});
        }).to.throws(/requires a true value/i);
      });

    });

    describe('with true', function() {
      checker.rules({'disallowEmber1.13': true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.View.extend({
              templateName: 'some-menu',
              title: 'My Menu'
            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
