/**
 * @module       EmployeeDataService
 * @file         service.js
 * @description  EmployeeDataService class holds the callback method for controller 
 * @author       Rakesh SR <rakeshsrking@gmail.com>
 * @since        18/06/2021  
-----------------------------------------------------------------------------------------------*/

const employeeModel = require('../models/employee.model.js')
const helperClass = require('../middleware/employee.helper.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class EmployeeDataService{

    /**
     * @description Create and save employee then send response to controller
     * @method createEmpDetails to save the employee
     * @param callback callback for controller
     */

    createEmpDetails = (employee, callback) => {
        employeeModel.createEmpDetails(employee, (error, data) => {
            return error ? callback(error, null) : callback(null, data)
        });
    }

    /**
     * @description sends the info to loginAPI in the controller
     * @method loginEmpDetails
     * @param callback callback for controller
     */
    
     loginEmpDetails = (loginEmployeeData, callback) => {

        const token = helperClass.generateToken({loginEmployeeData});

        employeeModel.loginEmpDetails(loginEmployeeData, (error, data) => {
            if(error) {
                callback(error, null);
            } else if(helperClass.bcryptDataCheck(loginEmployeeData.password, data.password)) {
                return callback("Please enter your correct password...!", null);
            }
            return callback(null, token);
        });
    }
}


//exporting the class to utilize function created in this class
module.exports = new EmployeeDataService();