describe('lib/rules/disallow-createwithmixins', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowCreateWithMixins: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowCreateWithMixins: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowCreateWithMixins: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report Object.extend',
          code: function() {
            var obj = Ember.Object.extend({
            }).create();
          }
        }, {
          it: 'should report Object.createWithMixins',
          errors: 1,
          code: function() {
            var obj = Ember.Object.createWithMixins({
            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
