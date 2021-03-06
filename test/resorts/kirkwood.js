var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('kirkwood');

/*global describe, it */
describe('parse kirkwood', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/kirkwood.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '#1 Snowkirk': 'open',
        '#10 The Wall': 'closed',
        '#11 The Reut': 'closed',
        '#12 Magic Carpet 1': 'closed',
        '#13 Magic Carpet 2': 'closed',
        '#14 Lookout Vista': 'closed',
        '#15 Covered Wagon 1': 'closed',
        '#16 Covered Wagon 2': 'closed',
        '#2 Caples Crest': 'closed',
        '#3 Iron Horse': 'closed',
        '#4 Sunrise': 'closed',
        '#5 Solitude': 'closed',
        '#6 Cornice Express': 'closed',
        '#7 TC Express': 'closed',
        '#8 Red Cliffs Tow': 'closed',
        '#9 Bunny': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
