describe('lib/rules/disallow-positionalparams-extend', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowPositionalParamsExtend: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowPositionalParamsExtend: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowPositionalParamsExtend: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report reopened class',
          code: function() {
            var Thing = Ember.Component.extend();
            Thing.reopenClass({
              positionalParams: [ 'a', 'b' ]
            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.Component.extend({
              positionalParams: [ 'a', 'b' ]
            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
