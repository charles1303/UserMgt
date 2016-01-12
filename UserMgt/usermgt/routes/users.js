var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/adduser', function(req, res) {
    var User = require('../models/user.js');


    var userName = req.body.username;
    var userEmail = req.body.email;
    var userPassword = req.body.password;
    var userFullname = req.body.fullname;
    var userAge = req.body.age;
    var userLocation = req.body.location;
    var userGender = req.body.gender;

        // create a new user
    var newUser = new User.user({
      fullname: userFullname,
      username: userEmail,
      email: userEmail ,
      password: userPassword,
      gender: userGender,
      age: userAge,
      meta: {age: userAge, website: 'http://localhost:3000'},
      location: userLocation,
      created_at: new Date()
    });

    // call the custom method. this will just add -dude to his name
    // user will now be name-dude
    newUser.dudify(function(err, name) {
      if (err) throw err;

      console.log('Your new name is ' + name);
    });

    // call the built-in save method to save to the database
    newUser.save(function(err) {
      if (err) throw err;

      //console.log('newUser.isNew!' + newUser.isNew);

  console.log('User saved successfully!');
  res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );


});
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
	var User = require('../models/user.js');

	var userToDelete = req.params.id;

    User.user.findOneAndRemove({'_id': userToDelete}, function(err,removed) {
    	res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
});

   
});



module.exports = router;
