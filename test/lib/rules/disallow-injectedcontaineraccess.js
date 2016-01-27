describe('lib/rules/disallow-injectedcontaineraccess', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowInjectedContainerAccess: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowInjectedContainerAccess: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowInjectedContainerAccess: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report on similar container Identifiers',
          filename: 'app/component/x-foo.js',
          code: function() {
            var XFooComponent = Ember.Component.extend({
              init: function() {
                this._supezr();
                var x = {}, container = {};
                this.customThingOne = this.myContainer.lookup('custom:thing');
                this.customThingTwo = x.container.lookup('custom:thing');
                this.customThingThree = container.lookup('custom:thing');
              }
            });
          }
        },
        {
          it: 'should report deprecation this.container',
          errors: 1,
          filename: 'app/component/x-foo.js',
          code: function() {
            var XFooComponent = Ember.Component.extend({
              init: function() {
                this._super();
                this.customThing = this.container.lookup('custom:thing');
              }
            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
