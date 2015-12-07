describe('lib/rules/disallow-initializerarity', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowInitializerArity: undefined});
        }).to.throws(/requires a true value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowInitializerArity: {}});
        }).to.throws(/requires a true value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowInitializerArity: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report identifier initializer',
          filename: 'app/initializer/foo.js',
          code: function() {
            var initialize = function(application) {
              application.inject('route', 'service:session');
            }

            return {
              name: 'inject-session',
              initialize: initialize
            }
          }
        }, {
          it: 'should not report anonymous initializer',
          filename: 'app/initializer/foo.js',
          code: function() {
            return {
              name: 'inject-session',
              initialize: function(application) {
                application.inject('route', 'service:session');
              }
            }
          }
        }, {
          it: 'should not report deprecated initializer in non-initializer path',
          filename: 'app/controller/foo.js',
          code: function() {
            return {
              name: 'inject-session',
              initialize: function(application, thisWouldNormallyBeBad) {
                application.inject('route', 'service:session');
              }
            }
          }
        }, {
          it: 'should report deprecated use identifier initializer',
          filename: 'app/initializer/foo.js',
          errors: 1,
          code: function() {
            var initialize = function(container, application) {
              application.inject('route', 'service:session');
            }

            return {
              name: 'inject-session',
              initialize: initialize
            }
          }
        }, {
          it: 'should report deprecated use anonymous initializer',
          filename: 'app/initializer/foo.js',
          errors: 1,
          code: function() {
            return {
              name: 'inject-session',
              initialize: function(container, application) {
                application.inject('route', 'service:session');
              }
            }
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
