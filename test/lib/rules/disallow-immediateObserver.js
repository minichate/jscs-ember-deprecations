describe('lib/rules/disallow-immediateObserver', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowImmediateObserver: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowImmediateObserver: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowImmediateObserver: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report .observer use',
          code: function() {
            Ember.Object.extend({
              valueObserver: Ember.observer('value', function() {
              })
            });
          }
        }, {
          it: 'should report deprecated immediateObserver use',
          errors: 1,
          code: function() {
            Ember.Object.extend({
              valueObserver: Ember.immediateObserver('value', function() {
              })
            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
