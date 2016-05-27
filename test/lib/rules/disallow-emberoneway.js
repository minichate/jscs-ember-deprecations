describe('lib/rules/disallow-emberoneway', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowEmberOneway: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowEmberOneway: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowEmberOneway: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.K();
          }
        }, {
          it: 'should not report Ember.computed.oneWay()',
          code: function() {
            var user = Ember.Object.extend({
              firstName: null,
              nickName: Ember.computed.oneWay('firstName')
            });
          }
        }, {
          it: 'should not report Ember.foobar.oneWay()',
          code: function() {
            var user = Ember.Object.extend({
              firstName: null,
              nickName: Ember.foobar.oneWay('firstName')
            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            var user = Ember.Object.extend({
              firstName: null,
              nickName: Ember.oneWay('firstName')
            });
          },
          errors: [{
            column: 25, line: 3, filename: 'input', rule: 'disallowEmberOneway', fixed: undefined,
            message: 'disallowEmberOneway: Ember.oneWay is deprecated in Ember 1.13'
          }]
        }
        /* jshint ignore:end */
      ]);
    });
});
