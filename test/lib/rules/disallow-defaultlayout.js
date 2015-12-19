describe('lib/rules/disallow-defaultlayout', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowDefaultLayout: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowDefaultLayout: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowDefaultLayout: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report layout',
          code: function() {
            Ember.Component.extend({
              layout: layout
            });
          }
        }, {
          it: 'should report defaultLayout',
          errors: 1,
          code: function() {
            Ember.Component.extend({
              defaultLayout: layout
            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
