describe('lib/rules/disallow-prototypeextension', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowPrototypeExtension: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowPrototypeExtension: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowPrototypeExtension: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.Controller.extend({
              foo: Ember.computed('bar', function() {

              })
            });
          }
        }, {
          it: 'should not report',
          code: function() {
            Ember.Controller.extend({
              foo: Ember.computed('bar', function() {

              }).volitile()
            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.Controller.extend({
              foo: function() {

              }.property('bar')
            });
          },
          errors: [{
            column: 8, line: 4, filename: 'input', rule: 'disallowPrototypeExtension', fixed: undefined,
            message: 'disallowPrototypeExtension: Don\'t use the Ember .property() prototype extension. Use Ember.computed() instead'
          }]
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.Controller.extend({
              foo: function() {

              }.property()
            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.Controller.extend({
              foo: function() {

              }.property('bar').volitile()
            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.Controller.extend({
              foo: Ember.computed(function() {

              }.property('bar'))
            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.Controller.extend({
              foo: Ember.computed(function() {

              }).property('bar')
            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.Controller.extend({
              foo: Ember.computed(function() {

              }).observes('bar')
            });
          },
          errors: [{
            column: 9, line: 4, filename: 'input', rule: 'disallowPrototypeExtension', fixed: undefined,
            message: 'disallowPrototypeExtension: Don\'t use the Ember .observes() prototype extension. Use Ember.observer() instead'
          }]
        }, {
          it: 'should not report',
          code: function() {
            Ember.Controller.extend({
              foo: Ember.observer('bar', function() {

              })
            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.Controller.extend({
              foo: Ember.computed(function() {

              }).observesBefore('bar')
            });
          },
          errors: [{
            column: 12, line: 4, filename: 'input', rule: 'disallowPrototypeExtension', fixed: undefined,
            message: 'disallowPrototypeExtension: Don\'t use the Ember .observesBefore() prototype extension. Use addObserver instead'
          }]
        }
        /* jshint ignore:end */
      ]);
    });
});
