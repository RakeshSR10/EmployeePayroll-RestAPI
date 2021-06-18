/**
 * @module       employeeController
 * @file         employee.controller.js
 * @description  employeeController class holds the API methods for routing 
 * @author       Rakesh SR <rakeshsrking@gmail.com>
 * @since        18/06/2021  
-----------------------------------------------------------------------------------------------*/

const Joi = require('joi')
const Service = require('../services/service.js')

//Joi Validation for Employee Data
const validateSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    emailId: Joi.string().emailId().required(),
    password: Joi.string().min(8).max(30).required(),
    repeatPassword: Joi.string().valid(Joi.ref('password')).required()
})

class employeeController {
    /**
     * @description Create and save employee and sending response to service
     * @method registerAPI to save the employee
     * @param req,res for service
     */
    registerAPI = (req, res) => {
        //Validate request 
        if(!req.body.emailId){
            return res.status(400).send({
                message: "Email should be Unique"
            });
        }

        //Create employee
        const employee = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            password: req.body.password,
            repeatPassword: req.body.repeatPassword
        }

        const employeeData = {}

        //Validate Employee request data
        const ValidationData = validateSchema.validate(employee)
        if(ValidationData.error){
            res.status(400).send('Validation error')
        }
        Service.createEmpDetails(employee, (error, data) => {
            if(error){
                return res.status(500)
                .send({
                    message: error.message || 'Error occurred while Registering Employee data'
                })
            }
            else 
            {
                return res.status(500).send({
                    message: 'Success', data: employeeData.data = data
                })
            }
        })
    }
}

module.exports = new employeeController();
