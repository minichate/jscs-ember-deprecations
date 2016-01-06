describe('lib/rules/disallow-dual-getter-setter', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowDualGetterSetter: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowDualGetterSetter: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowDualGetterSetter: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Ember.Object.extend({
              fullName: Ember.computed("firstName", "lastName", {
                get: function() {
                  return this.get("firstName") + " " + this.get("lastName");
                },
                set: function(key, newName) {
                  var parts = newName.split(" ");
                  this.setProperties({ firstName: parts[0], lastName: parts[1] });
                  return newName;
                }
              })
            });
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Ember.Object.extend({
              fullName: Ember.computed("firstName", "lastName", function(key, newName) {
                if (arguments.length > 1) {
                  var parts = newName.split(" ");
                  this.setProperties({ firstName: parts[0], lastName: parts[1] });
                  return newName;
                } else {
                  return this.get("firstName") + " " + this.get("lastName");
                }
              })
            });
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
