describe('lib/rules/disallow-debugmissingarguments', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowDebugMissingArguments: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowDebugMissingArguments: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true for deprecateFunc', function() {
      checker.rules({disallowDebugMissingArguments: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.deprecateFunc(
              'Function#observesImmediately is deprecated. Use Function#observes instead',
              { id: 'ember-runtime.ext-function', until: '3.0.0' },
              FunctionPrototype._observesImmediately
            );
          }
        }, {
          it: 'should not report other functions',
          code: function() {
            Ember.foobar(
              'Function#observesImmediately is deprecated. Use Function#observes instead',
              { id: 'ember-runtime.ext-function', until: '3.0.0' },
              FunctionPrototype._observesImmediately
            );
          }
        }, {
          it: 'should not report options declared previously',
          code: function() {
            var options = { id: 'ember-runtime.ext-function', until: '3.0.0' };
            Ember.deprecateFunc(
              'Function#observesImmediately is deprecated. Use Function#observes instead',
              options,
              FunctionPrototype._observesImmediately
            );
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.deprecateFunc(
              'Function#observesImmediately is deprecated. Use Function#observes instead',
              FunctionPrototype._observesImmediately
            );
          }
        }, {
          it: 'should report options declared previously with no id key',
          errors: 1,
          code: function() {
            var options = { until: '3.0.0' };
            Ember.deprecateFunc(
              'Function#observesImmediately is deprecated. Use Function#observes instead',
              options,
              FunctionPrototype._observesImmediately
            );
          }
        }, {
          it: 'should report options with no id key',
          errors: 1,
          code: function() {
            Ember.deprecateFunc(
              'Function#observesImmediately is deprecated. Use Function#observes instead',
              { until: '3.0.0' },
              FunctionPrototype._observesImmediately
            );
          }
        }
        /* jshint ignore:end */
      ]);
    });

    describe('with true for deprecate', function() {
      checker.rules({disallowDebugMissingArguments: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.deprecate('Should not throw', false, { id: 'test', until: 'forever' });
          }
        }, {
          it: 'should not report options with id key',
          code: function() {
            Ember.deprecate(
              'Should not throw',
              false,
              { until: '3.0.0', id: 'foobar' }
            );
          }
        }, {
          it: 'should report',
          errors: 1,
          code: function() {
            Ember.deprecate('Should not throw', false);
          }
        }, {
          it: 'should report options with no id key',
          errors: 1,
          code: function() {
            Ember.deprecate(
              'Should not throw',
              false,
              { until: '3.0.0' }
            );
          }
        }
        /* jshint ignore:end */
      ]);
    });

    describe('with true for warn', function() {
      checker.rules({disallowDebugMissingArguments: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.warn('Should not throw', false, { id: 'test', until: 'forever' });
          }
        }, {
          it: 'should not report Ember.Logger.warn',
          code: function() {
            Ember.Logger.warn('Should not throw');
          }
        }, {
          it: 'should not report options with id key',
          code: function() {
            Ember.warn(
              'Should not throw',
              false,
              { until: '3.0.0', id: 'foobar' }
            );
          }
        }, {
          it: 'should report',
          errors: 1,
          code: function() {
            Ember.warn('Should not throw', false);
          }
        }, {
          it: 'should report options with no id key',
          errors: 1,
          code: function() {
            Ember.warn(
              'Should not throw',
              false,
              { until: '3.0.0' }
            );
          }
        }
        /* jshint ignore:end */
      ]);
    });

    describe('with true for computed.deprecatingAlias', function() {
      checker.rules({disallowDebugMissingArguments: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.Object.extend({
              bar: "baz",
              foo: Ember.computed.deprecatingAlias('bar', { until: '3.0.0', id: 'foobar' })
            });
          }
        }, {
          it: 'should not report incorrect attachment',
          code: function() {
            Ember.Object.extend({
              bar: "baz",
              foo: Ember.foo.deprecatingAlias('bar', { until: '3.0.0', id: 'foobar' })
            });
          }
        }, {
          it: 'should not report incorrect attachment',
          code: function() {
            Ember.Object.extend({
              bar: "baz",
              foo: Ember.deprecatingAlias('bar', { until: '3.0.0', id: 'foobar' })
            });
          }
        }, {
          it: 'should report missing options',
          errors: 1,
          code: function() {
            Ember.Object.extend({
              bar: "baz",
              foo: Ember.computed.deprecatingAlias('bar')
            });
          }
        }, {
          it: 'should report missing id attribute',
          errors: 1,
          code: function() {
            Ember.Object.extend({
              bar: "baz",
              foo: Ember.computed.deprecatingAlias('bar', { until: '3.0.0' })
            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
