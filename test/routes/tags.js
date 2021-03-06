var assert = require('assert');
var tags = require('../../lib/routes/tags');

/*global describe, it*/


describe('tags', function() {
  it('should classify object according to tags', function() {
    var objs = {
      'a': 't3,t2,t1',
      'b': 't2',
      'c': 't1,t2',
      'd': ''
    };

    function load(name){
      return {
        id: name,
        tags: objs[name].split(',')
      };
    }

    Object.keys(objs).forEach(function (n) {
      objs[n] = load(n);
    });
    var tt = tags(objs);

    assert.deepEqual(tt.t1.members, ['a', 'c']);
    assert.deepEqual(tt.t2.members, ['a', 'b', 'c']);
    assert.deepEqual(tt.t3.members, ['a']);
    assert.deepEqual(Object.keys(tt), ['t1', 't2', 't3']);
  });

  it('should conver names to cannonical form', function() {
    var objs = {
      'a': 'Nice Tag,Another Tag',
      'b': 'Another Tag'
    };

    function load(name){
      return {
        id: name,
        tags: objs[name].split(',')
      };
    }

    Object.keys(objs).forEach(function (n) {
      objs[n] = load(n);
    });
    var tt = tags(objs);

    assert.deepEqual(tt['nice-tag'].members, ['a']);
    assert.deepEqual(tt['nice-tag'].label, 'Nice Tag');
    assert.deepEqual(tt['another-tag'].members, ['a', 'b']);
    assert.deepEqual(tt['another-tag'].label, 'Another Tag');
    assert.deepEqual(Object.keys(tt), ['another-tag', 'nice-tag']);
  });
});
