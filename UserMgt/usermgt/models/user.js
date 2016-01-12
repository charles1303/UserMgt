var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  fullname: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  email: String,
  age: Number,
  gender: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

userSchema.methods.getSchema = function() {
  return userSchema;
};

userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude'; 

  return this.name;
};


// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
//module.exports = User;

module.exports = {
    user: User,
    userSchema: userSchema
}