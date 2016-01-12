var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'User Management System' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist1', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var User = require('../models/user.js');

      // get all the users
User.user.find({}, function(err, users) {
  if (err) throw err;

   res.json(users);

  // object of all the users
  //console.log(users);
});

});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var userPassword = req.body.password;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail,
        "password" : userPassword
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

router.get('/adduser2', function(req, res){
    var User = require('../models/user.js');

        // create a new user called chris
    var chris = new User.user({
      name: 'Chris3',
      username: 'sevilayha3',
      password: 'password3' 
    });

    // call the custom method. this will just add -dude to his name
    // user will now be Chris-dude
    chris.dudify(function(err, name) {
      if (err) throw err;

      console.log('Your new name is ' + name);
    });

    // call the built-in save method to save to the database
    chris.save(function(err) {
      if (err) throw err;

      //console.log('chris.isNew!' + chris.isNew);

  console.log('User saved successfully!');
  // And forward to success page
            res.redirect("showuser2");


});
})

router.get('/addEmployee2', function(req, res){
    var Empl = require('../models/employee.js');

        // create a new user called chris
    var emp = new Empl({
        name: 'Chris4',
      username: 'sevilayha4',
      password: 'password4',
      empNo: 'AX234'
    });

    

    // call the built-in save method to save to the database
    emp.save(function(err) {
      if (err) throw err;

      //console.log('chris.isNew!' + chris.isNew);

  console.log('Employee saved successfully!');
  // And forward to success page
            res.redirect("showemployee2");


});
})

router.get('/showuser2', function(req, res){
    var User = require('../models/user.js');

      // get all the users
User.user.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log(users);
});


})

router.get('/showemployee2', function(req, res){
    var Employee = require('../models/employee.js');

      // get all the users
Employee.find({}, function(err, emps) {
  if (err) throw err;

  // object of all the users
  console.log(emps);
});


})

module.exports = router;
