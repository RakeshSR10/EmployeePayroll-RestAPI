const Model = require('../models/employee.model.js')

class EmployeeDataService{
    createEmpDetails = (employee, callback) => {
        Model.createEmpDetails(employee, callback)
    }
}

module.exports = new EmployeeDataService();