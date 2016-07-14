describe('lib/rules/disallow-privateregistryproperty', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowPrivateRegistryProperty: undefined});
        }).to.throws(/requires a true value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowPrivateRegistryProperty: {}});
        }).to.throws(/requires a true value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowPrivateRegistryProperty: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            var resolverName = 'foo';
            if (app.resolveRegistration(resolverName)) {
              app.unregister(resolverName);
            }
            app.register(resolverName, Model);
          }
        }, {
          it: 'should not report unrecognized method',
          code: function() {
            app.registry.foobar(resolverName);
          }
        }, {
          it: 'should not report non registry usage',
          code: function() {
            app.foo.resolve(resolverName);
            app.foo.unregister(resolverName);
            app.foo.register(resolverName, Model);
          }
        }, {
          it: 'should report deprecated use',
          errors: 3,
          code: function() {
            var resolverName = 'foo';
            if (app.registry.resolve(resolverName)) {
              app.registry.unregister(resolverName);
            }
            app.registry.register(resolverName, Model);
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
