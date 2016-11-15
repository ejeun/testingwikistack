var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

console.log('fire the missiles!!');

describe('intro exercises', function() {

  describe('simple test adding', function() {
    it('should add 2+2 properly', function(){
      expect(2 + 2).to.equal(4);
    });
  })

  describe('asynchronous test', function() {
    it('testing setTimeout', function(done){
      this.timeout(1200);
      setTimeout(done, 1000);
    })
  })

  describe('spying on forEach', function() {
    it('should check forEach invokes functions once per element', function(){
      var testArray = [1 ,2 ,3];
      function plusOne(num){
        return num+1;
      };

      var spyVersion = chai.spy(plusOne);
      testArray.forEach(spyVersion);

      expect(spyVersion).to.have.been.called.exactly(3);

    });
  })

});
