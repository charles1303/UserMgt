var express = require('express');
var router = express.Router();
var bodyParser  = require('body-parser');


// use body parser so we can get info from POST and/or URL parameters
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/authenticate', function(req, res) {

	var Empl = require('../models/employee.js');

  
  Empl.Employee.findOne({
    empNo: req.body.empno
  }, function(err, employee) {

    if (err) throw err;

    if (!employee) {
      res.json({ success: false, message: 'Authentication failed. Employee not found.' });
    } else if (employee) {

      // check if password matches
      if (employee.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if employee is found and password is right
        // create a token
        var token = jwt.sign(employee, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


// route to return all employees (GET http://localhost:8080/api/employees)
router.get('/employees', function(req, res) {
	var Empl = require('../models/employee.js');
  Empl.Employee.find({}, function(err, employees) {
    res.json(employees);
  });
});   

module.exports = router;
