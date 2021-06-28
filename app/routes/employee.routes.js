//importing controller to access functionality 
const Controller = require('../controller/employee.controller.js')
const tokenCheck = require('../middleware/employee.helper.js');

//routes are used for handling http patterns
module.exports = (app) => {

    //Creating API for Employee Registration
    app.post('/employeeRegister', Controller.Registration);

    //Creating API for Employee Login 
    app.post('/employeeLogin', Controller.Login);

    //API for retrieve all employees details
    app.get('/employees', tokenCheck.tokenDataChecker, Controller.getAllEmployee);

    //API for retrieve one employee using ID
    app.get('/employees/:_id', tokenCheck.tokenDataChecker, Controller.getEmployeeById);

    //API for update employee using Id
    app.get('/update/:_id', tokenCheck.tokenDataChecker, Controller.update);

    //API for delete employee details from database using Id
    app.get('/delete/:_id', tokenCheck.tokenDataChecker, Controller.delete);
}