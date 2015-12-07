describe('lib/rules/disallow-computedany', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowComputedAny: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowComputedAny: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowComputedAny: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report Ember.computed.or()',
          code: function() {
            var Hamster = Ember.Object.extend({
              hasClothes: Ember.computed.or('hat', 'shirt')
            });
          }
        }, {
          it: 'should not report Foo.any()',
          code: function() {
            var Hamster = Ember.Object.extend({
              hasClothes: Foo.any('hat', 'shirt')
            });
          }
        }, {
          it: 'should not report Ember.notathing.any()',
          code: function() {
            var Hamster = Ember.Object.extend({
              hasClothes: Ember.notathing.any('hat', 'shirt')
            });
          }
        }, {
          it: 'should report Ember.computed.any()',
          errors: 1,
          code: function() {
            var Hamster = Ember.Object.extend({
              hasClothes: Ember.computed.any('hat', 'shirt')
            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
