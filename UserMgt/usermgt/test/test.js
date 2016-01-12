var assert = require('assert');
/*describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});*/

var User = require('../models/user');
/*describe('User', function(){
  describe('#save()', function(){
    it('should save without error', function(done){
      var user = new User.user({
      	fullname: 'userFullname',
      username: 'userEmail',
      email: 'userEmail' ,
      password: 'userPassword',
      gender: 'userGender',
      age: 23,
      meta: {age: 23, website: 'http://localhost:3000'},
      location: 'USA',
      created_at: new Date()
      	});
      user.save(function(err){
        if (err) throw err;
        done();
      });
    })
  })
})*/

describe('User', function(){
  describe('#delete()', function(){
    it('should delete without error', function(done){
    	//5694dedde6ec36e85f7d6ab7
      
      User.user.findOneAndRemove({'_id': '5694dedde6ec36e85f7d6ab7'},function(err){
        if (err) throw err;
        done();
      });
    })
  })
})