describe('lib/rules/disallow-emberview', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowEmberView: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowEmberView: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowEmberView: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.Component.extend({
              title: 'My Menu'
            });
          }
        }, {
          it: 'should not report',
          code: "import Ember from 'ember'; \
            export default Ember.Helper.extend({ \
              compute: function(params, hash) { \
                var type = params[0]; \
                return type + '-component'; \
              } \
            });"
        }, {
          it: 'should not report',
          code: "import Ember from 'ember'; \
            export default Foo.Helper.extend({ \
              compute: function(params, hash) { \
                var type = params[0]; \
                return type + '-component'; \
              } \
            });"
        }, {
          it: 'should report',
          errors: 1,
          code: "import Ember from 'ember'; \
            export default Ember.View.extend({ \
            });"
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.View.extend({
              templateName: 'some-menu',
              title: 'My Menu'
            });
          },
          errors: [{
            column: 0, line: 1, filename: 'input', rule: 'disallowEmberView', fixed: undefined,
            message: 'disallowEmberView: Ember.View is deprecated in Ember 1.13'
          }]
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.LinkView.extend({
              templateName: 'some-menu',
              title: 'My Menu'
            });
          },
          errors: [{
            column: 0, line: 1, filename: 'input', rule: 'disallowEmberView', fixed: undefined,
            message: 'disallowEmberView: Ember.LinkView is deprecated in Ember 1.13'
          }]
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.Select.extend({
              templateName: 'some-menu',
              title: 'My Menu'
            });
          },
          errors: [{
            column: 0, line: 1, filename: 'input', rule: 'disallowEmberView', fixed: undefined,
            message: 'disallowEmberView: Ember.Select is deprecated in Ember 1.13'
          }]
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.ContainerView.extend({
              templateName: 'some-menu',
              title: 'My Menu'
            });
          },
          errors: [{
            column: 0, line: 1, filename: 'input', rule: 'disallowEmberView', fixed: undefined,
            message: 'disallowEmberView: Ember.ContainerView is deprecated in Ember 1.13'
          }]
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.CollectionView.extend({
              templateName: 'some-menu',
              title: 'My Menu'
            });
          },
          errors: [{
            column: 0, line: 1, filename: 'input', rule: 'disallowEmberView', fixed: undefined,
            message: 'disallowEmberView: Ember.CollectionView is deprecated in Ember 1.13'
          }]
        }
        /* jshint ignore:end */
      ]);
    });
});
