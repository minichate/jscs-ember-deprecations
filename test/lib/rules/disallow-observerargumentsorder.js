describe('lib/rules/disallow-observerargumentsorder', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowObserverArgumentOrdering: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowObserverArgumentOrdering: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowObserverArgumentOrdering: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.observer('property1', 'property2', function() {
              // React to observer firing here
            })
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.observer(function() {
              // React to observer firing here
            }, 'property1', 'property2')
          },
          errors: [{
            column: 15, line: 1, filename: 'input', rule: 'disallowObserverArgumentOrdering', fixed: undefined,
            message: 'disallowObserverArgumentOrdering: Ember.observer must take a callable as the final argument as of Ember 1.13'
          }]
        }
        /* jshint ignore:end */
      ]);
    });
});
