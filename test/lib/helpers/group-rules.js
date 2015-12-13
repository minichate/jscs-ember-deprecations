// jshint undef:false

var DeprecatedClass = require('../../../lib/helpers/group-rules');

describe('lib/helpers/group-rules', function() {
  beforeEach(function() {
    sut = new DeprecatedClass();
  });

  it('should raise exception for getOptionName', function() {
    global.expect(function() {
      sut.getOptionName();
    }).to.throw('Needs to be implemented');
  });

  it('should raise exception for rules', function() {
    global.expect(function() {
      sut.rules();
    }).to.throw('Needs to be implemented');
  });
});
