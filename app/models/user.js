'use strict';

// Importing mongoose module
const mongoose = require('mongoose');
 
//Importing bcrypt
const bcrypt = require('bcrypt');

// Schema for the employee-details
const userSchemaModel = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      validate: /^[A-Z]{1}[A-Za-z]{2,30}/,
    },
    lastName: {
       type: String,
       require: true,
       validate: /^[A-Za-z]{2,30}/,
     },
    email: {
      type: String,
      require: true,
      validate:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      unique: true, //<check
    },
    password: {
      type: String,
      require: true,
      validate: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    }
  },
  {
    timestamps: true, //to add time stamps
    versionKey: false, //to avoid showing version
  }
);

/**
 * function to make hashed password.
 */
userSchemaModel.pre('save', function (next) {
  const user = this;

  //generating salt and adding to hashed password, then replacing password with hash
  bcrypt.hash(user.password, 10, (err, hashedPassword) => {
    if (err) return next(err);

    //assigning hashed password to the object
    user.password = hashedPassword;

    //re-routing to the next middleware
    next();
  });
});

//comparing passwords for the authentication
userSchemaModel.methods.comparePasswords = (clientsPassword, callback) => {
  bcrypt.compare(clientsPassword, this.password, (err, matched) => {
    return err ? callback(err, null) : callback(null, matched);
  });
};

//assigning schema to a constant
const userDataModel = mongoose.model('userDataModel', userSchemaModel);

// Exporting schema as a module, so that we can directly access the data inside structure.
module.exports = mongoose.model('userSchema', userSchemaModel);

class Registration {
  //Method to register new user
  newUserRegistration = (newUser, callback) => {
    try {
      const user = new userDataModel({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password
      });

      //to save the new data
      user.save({}, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      return callback(err, null);
    }
  };

  //To login
  loginUser = (clientCredentials, callback) =>{
    userDataModel.findOne(
      { email: clientCredentials.email },
      (err, data) => {
        if (err) return callback(err, null);
        else if (!data) return callback('User not found with email', null);
        return callback(null, data);
      }
    );
  }
}

//exporting class
module.exports = new Registration();