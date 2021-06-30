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
            if(error){
                return callback(error, null);
            }else if(helperClass.bcryptDataCheck(loginEmployeeData.password, data.password)){
                let token = helperClass.generateToken({loginEmployeeData});
                return (token) ? callback(null, token) : callback(error, null);
            }
            return callback("Please enter your correct password...!", error)
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

     /**
     * @description function handles to get single employee data
     * @param  employeeInfo 
     * @param  callBack 
     */
      getEmpDetailsById = (employee, callback) => {
          employeeModel.findOne(employee, (error, data) => {
              return (error) ? callback(error, null) : callback(null, data);
          });
      }

     /**
      * @description send Details to update in the controller
      * @method updateEmpDetailsById
      * @param callback, callback for controller
     */
      updateEmpDetailsById = (employeeId, employee, callback) => {
          employeeModel.updateById(employeeId, employee, (error, data) => {
              return (error) ? callback(error, null) : callback(null, data)
          })
      } 
     
     /**
      * @description send the details to delete in the Controller
      * @method deleteEmpDetailsById
      * @param callback, callback for Controller
     */
      deleteEmpDetailsById = (employee, callback) => {
          employeeModel.deleteById(employee, (error, data) =>{
              return (error) ? callback(error, null) : callback(null, data);
          })
      } 
}
//exporting the class to utilize function created in this class
module.exports = new EmployeeDataService();