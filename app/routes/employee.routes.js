const Controller = require('../controller/employee.controller.js')

module.exports = (app) => {
    //Creating API for Employee Registration
    app.post('/employee', Controller.registerAPI);
}