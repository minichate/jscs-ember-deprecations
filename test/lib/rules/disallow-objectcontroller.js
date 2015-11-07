describe('lib/rules/disallow-objectcontroller', function () {
    var checker = global.checker({
        plugins: ['./lib/index']
    });

    describe('not configured', function() {

      it('should report with undefined', function() {
        global.expect(function() {
          checker.configure({requireReturnTypes: undefined});
        }).to.throws(/accepted value/i);
      });

      it('should report with an object', function() {
        global.expect(function() {
          checker.configure({requireReturnTypes: {}});
        }).to.throws(/accepted value/i);
      });

    });
});
