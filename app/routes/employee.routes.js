//importing controller to access functionality 
const Controller = require('../controller/employee.controller.js')

//routes are used for handling http patterns
module.exports = (app) => {
    //Creating API for Employee Registration
    app.post('/employeeRegister', Controller.Registration);

    //Creating API for Employee Login 
    app.post('/employeeLogin', Controller.Login);

    //API for read all employees details
    app.get('/getAllEmployees', Controller.getAllEmployee);
}