describe('lib/rules/disallow-controllerneeds', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowControllerNeeds: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowControllerNeeds: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowControllerNeeds: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report controller injection',
          code: function() {
            Ember.Controller.extend({
              comments: Ember.inject.controller(),
              newComments: Ember.computed.alias('comments.newest')
            });
          }
        }, {
          it: 'should report needs string',
          errors: 1,
          code: function() {
            Ember.Controller.extend({
              needs: "post",
            });
          }
        }, {
          it: 'should report needs array',
          errors: 1,
          code: function() {
            Ember.Controller.extend({
              needs: ['comments'],
              newComments: Ember.computed.alias('controllers.comments.newest')
            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
