'use strict';

//importing controller to access functionality 
const Controller = require('../controllers/employee.controller.js')
const userController = require('../controllers/user.js');

//import helper to verify token
const tokenCheck = require('../middleware/helper.js');

//routes are used for handling http patterns
module.exports = (app) => {

    //To register a new user
  app.post('/register', userController.Registration);
  
  //To login
  app.post('/login', userController.Login);
  
  // To create a new employee
  app.post('/addEmployee', tokenCheck.checkJWToken, Controller.addEmployee);

  // Getting all the data from the server
  app.get('/getEmployees', tokenCheck.checkJWToken, Controller.getAllEmployees);

  // Getting employee by id
  app.get( '/getEmployee/:empId', tokenCheck.checkJWToken, Controller.getOneEmployee );

  // Updating the employee
  app.put( '/updateEmployee/:empId', tokenCheck.checkJWToken, Controller.updateEmployee );

  // deleting the employee
  app.delete( '/deleteEmployee/:empId', tokenCheck.checkJWToken, Controller.removeEmployee );
}