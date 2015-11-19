describe('lib/rules/disallow-reducecomputedpropertyclass', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowReduceComputedProperty: undefined});
        }).to.throws(/requires a true value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowReduceComputedProperty: {}});
        }).to.throws(/requires a true value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowReduceComputedProperty: true});

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

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report different import',
          code: "import Em from 'ember';\n" +
                "Ember.ReduceComputedProperty.create()"
        }, {
          it: 'should report same import',
          code: "import Em from 'ember';\n" +
                "Em.ReduceComputedProperty.create()",
          errors: 1
        }
        /* jshint ignore:end */
      ]);
    });
});
