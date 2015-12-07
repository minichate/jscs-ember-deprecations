describe('lib/rules/disallow-freezablemixin', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({disallowFreezableMixin: undefined});
        }).to.throws(/requires a boolean value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({disallowFreezableMixin: {}});
        }).to.throws(/requires a boolean value/i);
      });

    });

    describe('with true', function() {
      checker.rules({disallowFreezableMixin: true});

      checker.cases([
        /* jshint ignore:start */
        {
          it: 'should not report',
          code: function() {
            Contact = Ember.Object.extend({
              firstName: null,
              lastName: null,

              // swaps the names
              swapNames: function() {
                if (Object.isFrozen(this)) throw Ember.FROZEN_ERROR;
                var tmp = this.get('firstName');
                this.set('firstName', this.get('lastName'));
                this.set('lastName', tmp);
                return this;
              }

            });

            c = Contact.create({ firstName: "John", lastName: "Doe" });
            c.swapNames();  // returns c
            Object.freeze(c);
            c.swapNames();  // EXCEPTION
          }
        }, {
          it: 'should report deprecated use',
          errors: 1,
          code: function() {
            Contact = Ember.Object.extend(Ember.Freezable, {
              firstName: null,
              lastName: null,

              // swaps the names
              swapNames: function() {
                if (this.get('isFrozen')) throw Ember.FROZEN_ERROR;
                var tmp = this.get('firstName');
                this.set('firstName', this.get('lastName'));
                this.set('lastName', tmp);
                return this;
              }

            });

            c = Contact.create({ firstName: "John", lastName: "Doe" });
            c.swapNames();  // returns c
            c.freeze();
            c.swapNames();  // EXCEPTION
          }
        }
        /* jshint ignore:end */
      ]);
    });
});
