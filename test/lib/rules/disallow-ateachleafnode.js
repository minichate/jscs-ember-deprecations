describe('lib/rules/disallow-ateachleafnode', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowAtEachLeafNode: undefined});
        }).to.throws(/requires a true value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowAtEachLeafNode: {}});
        }).to.throws(/requires a true value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowAtEachLeafNode: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            var a = {
              foo: Ember.computed('bar.[]', function() {

              })
            };
          }
        }, {
          it: 'should not report',
          code: function() {
            var a = {
              foo: Ember.notathing('bar.@each', function() {

              })
            };
          }
        }, {
          it: 'should not report',
          code: function() {
            var a = {
              foo: Ember.computed('bar.@each.baz', function() {

              })
            };
          }
        }, {
          it: 'should not report',
          code: function() {
            var f = function(a) {

            };

            f('foo.@bar');
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            var a = {
              foo: function() {

              }.property('bar.@each')
            };
          }
        },
        {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            var a = {
              foo: Ember.computed('bar.@each', function() {

              })
            };
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
