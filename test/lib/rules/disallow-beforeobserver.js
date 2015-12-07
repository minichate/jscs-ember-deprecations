describe('lib/rules/disallow-beforeobserver', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowBeforeObserver: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowBeforeObserver: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowBeforeObserver: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should report deprecated .addBeforeObserver use',
          code: function() {
            Ember.Component.extend({
              foo: 'baz',
              bar: Ember.addBeforeObserver('foo', function() {
                // etc.
              })
            })
          },
          errors: 1
        }, {
          it: 'should report deprecated .observesBefore() prototype use',
          code: function() {
            Ember.Component.extend({
              foo: 'baz',
              bar: function() {
                // etc.
              }.observesBefore('foo')
            })
          },
          errors: 1
        }, {
          it: 'should report deprecated .removeBeforeObserver',
          code: function() {
            Ember.removeBeforeObserver(this, 'foo', this, callback);
          },
          errors: 1
        }, {
          it: 'should report deprecated .beforeObserversFor',
          code: function() {
            Ember.beforeObserversFor(this, 'foo');
          },
          errors: 1
        }, {
          it: 'should not report suggested addObserver usage',
          code: function() {
            function fooObserver(obj){
              var newFoo = obj.get('foo');
              if (obj._oldFoo !== newFoo) {
                // do your stuff here
                obj._oldFoo = newFoo;
              }
            }
            addObserver(obj, 'foo', fooObserver);
            fooObserver(obj); // Optionally call the observer immediately
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
