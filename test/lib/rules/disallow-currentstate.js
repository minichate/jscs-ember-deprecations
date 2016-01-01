describe('lib/rules/disallow-currentstate', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowCurrentState: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowCurrentState: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowCurrentState: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            App.MyComponentComponent = Ember.Component.extend({
                foo: 'bar',
                init: function(){
                    this.set('foo', 'something');
                    this._super();
                }
            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            App.MyComponentComponent = Ember.Component.extend({
                foo: 'bar',
                currentState: 'myOwnProperty',
                init: function(){
                    this.set('foo', 'something');
                    this._super();
                }
            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            App.MyComponentComponent = Ember.Component.extend({
                foo: 'bar',
                _currentState: 'myOwnProperty',
                init: function(){
                    this.set('foo', 'something');
                    this._super();
                }
            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
