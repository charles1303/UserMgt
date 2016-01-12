var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var User = require('./user.js');
console.log('User.userSchema  '+User.userSchema);

// create a schema
var employeeSchema = User.userSchema.extend({
  empNo: String
  
});


// the schema is useless so far
// we need to create a model using it
var Employee = mongoose.model('Employee', employeeSchema);

// make this available to our users in our Node applications
module.exports = Employee;