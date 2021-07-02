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
//controller will handling the Register and Login operations
class employeeController {
    /**
     * @description Create and save employee and sending response to service
     * @method registerAPI to save the employee
     * @param req,res for service
     */
    Registration = (req, res) => {
        //Validate request 
        //req.body can extracts the data that was sent as JSON in the request body
        const validation = validateSchema.validate(req.body)
        if(validation.error){
            return res.status(400).send({
                message: validation.error.details[0].message,
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
                    success: false,
                    message: "Email already in use",
                    data: null
                })
            }
            else 
            {
                return res.status(200).send({
                    success: true,
                    message: 'Employee registered successfully.',
                    data: data
                })
            }
        })
    }
    /**
     * @description retrieving login info from user by emailId and password
     * @method Login
     * @param req,res for employeeService
     */
     Login = (req, res) => {
        const loginEmployeeData = {
            emailId: req.body.emailId,
            password : req.body.password
        }
        employeeService.loginEmpDetails(loginEmployeeData , (error, token) => {
            return((error) ?
            res.status(400).send({
                success: false, 
                message: error
            }) : 
            res.send({
                success: true, 
                message: "Login Successfully...",
                token: token
            }));
        })
    }
    /**
     * @description retrieve all employee data in this function
     * @param req, res, for employeeService
     * @method getAllEmployee
     */
     getAllEmployee = (req, res) => {
         employeeService.getAllEmpDetails((error, data) => {
             if(error) {
                 return res.status(400)
                        .send({
                            success: false,
                            message: "Error while retrieving Employee Details",
                            data: null
                        });
             } else {
                 return res.status(200).send({
                     success: true,
                     message: "Details of all the Employees",
                     data: data
                })
             }
         })
     }

     /**
      * @description get employee data by using employeeId
      * @param req, res
      */
      getEmployeeById = (req, res) => {
          let employeeId = req.params
          employeeService.getEmpDetailsById(employeeId, (error, data) => {
              if(error){
                  return res.status(400)
                    .send({
                            success: false,
                            message: "Error while retrieving single employee details",
                            data: null
                        })
              } else {
                  return res.status(200)
                    .send({
                        success: true,
                        message: "Successfully retrieving single employee details",
                        data: data
                    })
                }
            })
    }

    /**
     * @description Update employee Details by Id
     * @method update
     * @param req, res for service
     */
    update = (req, res) => {
        const validation = validateSchema.validate(req.body);
        if(validation.error) {
            return res.status(400).send({message: validation.error.details[0].message})
        }
        let employeeId = req.params
        const employee = {
            _id: req.params._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            password: req.body.password
        }
        employeeService.updateEmpDetailsById(employeeId, employee, (error, data) => {
            if(error){
                return res.status(400).
                    send({
                        success: false,
                        message: "Error occurred while updating data",
                        data: null
                    })
            } else {
                return res.status(200).
                    send({
                        success: true,
                        message: "Employee details updating successfully",
                        data: data
                    })
            }
        })
    }

    /**
     * @description deleting employee details using Id
     * @method delete
     * @param req, res for service
     */
    delete = (req, res) => {
        let employee = req.params
        employeeService.deleteEmpDetailsById(employee, (error, data) =>{
            if(error){
                return res.status(404).
                send({
                    success: false,
                    message: "Given Employee not found",
                    data: data
                })
            }else {
                return res.status(200).send
                ({
                    success: true,
                    message: "Successfully deleted employee details",
                    data: data
                })
            }
        })
    }
}
//exporting the class to utilize function created in this class
module.exports = new employeeController();
