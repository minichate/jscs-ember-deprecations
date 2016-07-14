describe('lib/rules/disallow-instanceinitializer', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowInstanceInInitializer: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowInstanceInInitializer: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowInstanceInInitializer: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            App.initializer({
              name: "clock",

              initialize: function(registry, application) {
                application.register("clock:main", Clock);
              }
            });

            App.instanceInitializer({
              name: "clock",

              initialize: function(instance) {
                var clock = instance.container.lookup("clock:main");
                clock.setStartTime(Date.now());
              }
            });
          }
        }, {
          it: 'should not report',
          code: function() {
            Almost.theSame({
              name: "clock",

              butNotQuite: function(container, application) {
                application.register("clock:main", Clock);
                var clock = container.lookup("clock:main");
                clock.setStartTime(Date.now());
              }
            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            App.initializer({
              name: "clock",

              initialize: function(container, application) {
                application.register("clock:main", Clock);
                var clock = container.lookup("clock:main");
                clock.setStartTime(Date.now());
              }
            });
          },
          errors: [{
            column: 31, line: 6, filename: 'input', rule: 'disallowInstanceInInitializer', fixed: undefined,
            message: 'disallowInstanceInInitializer: Instances in initializers are deprecated in Ember 1.11'
          }]
        }
        /* jshint ignore:end */
      ]);
    });
});
