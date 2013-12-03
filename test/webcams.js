var should = require('should');
var webcams = require('../lib/webcams');

/*global describe, it*/

describe('webcams', function() {

  it('should return no webcams if location is missing', function(done) {
    webcams({}, function(err, webcams) {
      should.not.exist(err);
      should.not.exist(webcams);
      done();
    });
  });


  if (!process.env.WEBCAMS_DEV_ID) {
    it.skip('should return webcams for valid location');
  } else{
    it('should return webcams for valid location', function(done) {
      webcams({
        counter: 1,
        ll: [-121.67865, 44.003559 ] // Mount Bachelor
      }, function(err, webcams) {
        var webcam, mobile;

        should.not.exist(err);
        should.exist(webcams);

        webcams.should.have.length(1);

        webcam = webcams[0];

        webcam.should.have.property('name', 'Mount Bachelor');
        webcam.should.have.property('source').with.startWith('http://www.webcams.travel/webcam');
        webcam.should.have.property('image').with.startWith('http://images.webcams.travel/preview/');
        webcam.should.have.property('notice', 'Webcam by <a href="http://webcams.travel" target="_blank">webcams.travel</a>');

        webcam.should.have.property('mobile').with.type('object');
        mobile = webcam.mobile;

        mobile.should.have.property('name', 'Mount Bachelor');
        mobile.should.have.property('source').with.startWith('http://m.webcams.travel/webcam');
        mobile.should.have.property('image').with.startWith('http://images.webcams.travel/preview/');
        mobile.should.have.property('notice', 'Webcam by <a href="http://m.webcams.travel" target="_blank">webcams.travel</a>');

        done(err);
      });
    });
  }

});