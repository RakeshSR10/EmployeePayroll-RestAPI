'use strict';

// Importing module from service.js
const service = require('../services/user.js');
 
//Importing middle ware to validate schema (joi validator)
const { validateInput } = require('../middleware/user.validation.js');

//ES6-feature: class
class EmployeeController {
  /**
   * function to call the create function from service.js (creates new employee)
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
   Registration = (req, res) => {
    try {
      //validation
      const userInputValidation = validateInput.validate(req.body);
      if (userInputValidation.error) {
        return res.status(400).send({
          success: false,
          message: userInputValidation.error.details[0].message,
          data: req.body,
        });
      }

      //Object for the new employee data
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };

      //calling method to add new employee data
      service.registerNewEmployee(newUser, (err, data) => {
        return err
          ? res.status(400).send({
              success: false,
              message:
                err.message || 'Some error occurred while adding user',
            })
          : res.status(201).send({
              success: true,
              message: 'User registered successfully',
              data: data,
            });
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Some error occurred!',
      });
    }
  };

  /**
   * To login the employee and authenticate
   * @param {*} req (express property)
   * @param {*} res (express property)
   */
  Login = (req, res) => {
    const userCredentials = {
      email: req.body.email,
      password: req.body.password,
    };
    
    //calling a function to login employee
    service.userLogin(userCredentials, (err, token) => {
      return err
        ? res.status(400).send({ success: false, message: err })
        : res
            .status(200)
            .send({ success: true, message: 'Login successfully', token: token });
    });
  }
}

//exporting the class
module.exports = new EmployeeController();
