/**
 * @module       employeeController
 * @file         employee.controller.js
 * @description  employeeController class holds the API methods for routing 
 * @author       Rakesh SR <rakeshsrking@gmail.com>
 * @since        18/06/2021  
-----------------------------------------------------------------------------------------------*/

//declared a constant variable to assign a imported class from services
const employeeService = require('../services/service.js')

//declared a constant variable to assign a imported class from middleware
const validateSchema = require('../middleware/employee.validation.js')

//create class to write function
class employeeController {
    /**
     * @description Create and save employee and sending response to service
     * @method registerAPI to save the employee
     * @param req,res for service
     */
    
    registrationAPI = (req, res) => {
        //Validate request 
        const validation = validateSchema.validate(req.body)
        if(validation.error){
            res.status(400).send({
                message: validation.error.details[0].message
            })
        }

        //Create employee
        const employee = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            password: req.body.password
        }
        employeeService.createEmpDetails(employee, (error, data) => {
            if(error){
                return res.status(400)
                .send({
                    message: error.message || 'Error occurred while Registering Employee data'
                })
            }
            else 
            {
                return res.status(200).send({
                    message: 'Success', data: data
                })
            }
        })
    }

    /**
     * @description retrieving login info from user by emailId and password
     * @method loginAPI
     * @param req,res for service
     */

     loginAPI = (req, res) => {
        const loginEmployeeData = {
            emailId: req.body.emailId,
            password : req.body.password
        }
        employeeService.loginEmpDetails(loginEmployeeData , (error, data) => {
            return((error) ?
            res.status(400).send({
                success: false, 
                message: error
            }) : 
            res.send({
                success: true, 
                message: "Login Successfully...",
                data:data
            }));
        })
    }
}

//exporting the class to utilize function created in this class
module.exports = new employeeController();
