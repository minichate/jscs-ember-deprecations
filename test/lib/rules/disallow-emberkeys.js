var expect = require('chai').expect;

describe('lib/rules/disallow-emberkeys', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowEmberKeys: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowEmberKeys: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowEmberKeys: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Object.keys({});
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.keys();
          },
          errors: [{
            column: 0, line: 1, filename: 'input', rule: 'disallowEmberKeys', fixed: undefined,
            message: 'disallowEmberKeys: Ember.keys is deprecated in Ember 1.13'
          }]
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            const foo = Ember.keys({
              yellow: 'banana'
            });
          }
        }
        /* jshint ignore:end */
      ]);

      it('fixed to Object.keys()', function() {
        var result = checker.fixString("Ember.keys({})");
        expect(result.output).to.equal("Object.keys({})");
      });
    });
});
