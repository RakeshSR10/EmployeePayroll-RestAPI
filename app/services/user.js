'use strict';

// Importing the database structure or model
const userSchema = require('../models/user.js');
 
//Importing helper class
const helper = require('../middleware/helper.js');

//ES-6 feature: class
class ServiceMethods {
  /**
   * creates an employee object with the request of a client
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns callback
   */
  registerNewEmployee = (newUser, callback) => {
    try {
      //calling the method to create new employee object with given data
      userSchema.newUserRegistration(newUser, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err || 'Some error occurred!', null);
    }
  };

  /**
   * To authorize the user
   * @param {object} userCredentials data from client(email and password)
   * @param {function} callback callback function
   */
  userLogin = (userCredentials, callback) => {
    userSchema.loginUser(userCredentials, (err, data) => {
      if(err){
        return callback(err, null);
      } else if(helper.passwordCheckWithBCrypt(userCredentials.password, data.password)){
        const token = helper.accessTokenGenerator(userCredentials);
        return (token) ? callback(null, token) : callback(err, null);
      }
      return callback('Wrong password!', null)
    })
  }
}

//exporting class
module.exports = new ServiceMethods();
