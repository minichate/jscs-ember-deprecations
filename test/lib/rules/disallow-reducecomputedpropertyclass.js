describe('lib/rules/disallow-reducecomputedpropertyclass', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowReduceComputed: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowReduceComputed: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowReduceComputed: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.Array.extend({

            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.ReduceComputedProperty.extend({

            });
          }
        }, {
          id: 'should report deprecated use',
          errors: 1,
          code: function() {
            var foo = Ember.Controller.extend({
              total: Ember.reduceComputed("foo.@each.{bar,baz}", {
              })
            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
