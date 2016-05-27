describe('lib/rules/disallow-appinstancecontainer', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowAppInstanceContainer: undefined});
        }).to.throws(/requires a true value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowAppInstanceContainer: {}});
        }).to.throws(/requires a true value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowAppInstanceContainer: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report appinstance.lookup',
          filename: 'app/initializer/foo.js',
          code: [
            "var initialize = function(appInstance) {",
            "  var store = appInstance.lookup('service:store');",
            "",
            "  store.pushPayload('<payload here>');",
            "}",
            "",
            "export default {",
            "  name: 'preload-store',",
            "  initialize: initialize",
            "}"
          ].join('\n')
        }, {
          it: 'should not report appinstance.container in non-initializer path',
          filename: 'app/bar/foo.js',
          code: [
            "var initialize = function(appInstance) {",
            "  var store = appInstance.container.lookup('service:store');",
            "",
            "  store.pushPayload('<payload here>');",
            "}",
            "",
            "export default {",
            "  name: 'preload-store',",
            "  initialize: initialize",
            "}"
          ].join('\n')
        }, {
          it: 'should not report empty params',
          filename: 'app/initializer/foo.js',
          code: [
            "var initialize = function() {",
            "}",
            "",
            "export default {",
            "  name: 'preload-store',",
            "  initialize: initialize",
            "}"
          ].join('\n')
        }, {
          it: 'should not report anonymous initializer',
          filename: 'app/initializer/foo.js',
          code: [
            "export default {",
            "  name: 'inject-session',",
            "  initialize: function(application) {",
            "    application.lookup('service:session');",
            "  }",
            "}"
          ].join('\n')
        }, {
          it: 'should report appinstance.container',
          filename: 'app/initializer/foo.js',
          errors: 1,
          code: [
            "var initialize = function(appInstance) {",
            "  var store = appInstance.container.lookup('service:store');",
            "",
            "  store.pushPayload('<payload here>');",
            "}",
            "",
            "export default {",
            "  name: 'preload-store',",
            "  initialize: initialize",
            "}"
          ].join('\n')
        }, {
          it: 'should report anonymous initializer',
          filename: 'app/initializer/foo.js',
          errors: 1,
          code: [
            "export default {",
            "  name: 'inject-session',",
            "  initialize: function(application) {",
            "    application.container.lookup('service:session');",
            "  }",
            "}"
          ].join('\n')
        }
        /* jshint ignore:end */
      ]);
    });
});
