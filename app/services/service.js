/**
 * @module       EmployeeDataService
 * @file         service.js
 * @description  EmployeeDataService class holds the callback method for controller 
 * @author       Rakesh SR <rakeshsrking@gmail.com>
 * @since        18/06/2021  
-----------------------------------------------------------------------------------------------*/

const Model = require('../models/employee.model.js')

class EmployeeDataService{
    /**
     * @description Create and save employee then send response to controller
     * @method createEmpDetails to save the employee
     * @param callback callback for controller
     */
    createEmpDetails = (employee, callback) => {
        Model.createEmpDetails(employee, callback)
    }
}

module.exports = new EmployeeDataService();