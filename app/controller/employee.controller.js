const Employee = require('../models/employee.model.js');

//create and save new employee
exports.registerAPI = (req, res) => {
    //validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Employee data can not be empty"
        });
    }

    //Create Employee
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: req.body.password,
    })

    //Save Employee Data in Database
    employee.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message ||'Some erroe occurred while creating employee data'
        });
    })
};