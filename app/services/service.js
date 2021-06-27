/**
 * @module       EmployeeDataService
 * @file         service.js
 * @description  EmployeeDataService class holds the callback method for controller 
 * @author       Rakesh SR <rakeshsrking@gmail.com>
 * @since        18/06/2021  
-----------------------------------------------------------------------------------------------*/
const employeeModel = require('../models/employee.model.js')
const helperClass = require('../middleware/employee.helper.js');

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
        employeeModel.loginEmpDetails(loginEmployeeData, (error, data) => {  
            if(error) {
                callback(error, null);   
            } 
            if(helperClass.bcryptDataCheck(loginEmployeeData.password, data.password)) {
                return callback("Please enter your correct password...!", null);
            } 
            else if(data){               
                var token = helperClass.generateToken({loginEmployeeData});
            }
            return callback(null, token);
        });
    }
    /**
     * @description send employee Information to read in the controller
     * @method getAllEmpDetails
     * @param callback, callback for controller 
     */
     getAllEmpDetails = (callback) => {
         employeeModel.findAll((error, data) => {
             return (error) ? callback(error, null) : callback(null, data);
         })
     }
}
//exporting the class to utilize function created in this class
module.exports = new EmployeeDataService();