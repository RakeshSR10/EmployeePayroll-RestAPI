const Controller = require('../controller/employee.controller.js')

module.exports = (app) => {
    //Creating API for Employee Registration
    app.post('/employeeRegister', Controller.registrationAPI);

    //Creating API for Employee Login 
    app.post('/employeeLogin', Controller.loginAPI);
}