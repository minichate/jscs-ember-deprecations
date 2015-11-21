var DeprecatedClass = require('../../../lib/helpers/deprecated-class');

describe('lib/helpers/deprecated-class', function() {
  it('should raise exception for getOptionName', function() {
    global.expect(function() {
      var sut = new DeprecatedClass();
      sut.getOptionName();
    }).to.throw('Needs to be implemented');
  });

  it('should raise exception for getErrorString', function() {
    global.expect(function() {
      var sut = new DeprecatedClass();
      sut.getErrorString({});
    }).to.throw('Needs to be implemented');
  });

  it('should raise exception for getDeprecatedClass', function() {
    global.expect(function() {
      var sut = new DeprecatedClass();
      sut.getDeprecatedClass();
    }).to.throw('Needs to be implemented');
  });
});
