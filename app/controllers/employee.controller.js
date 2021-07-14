/**
 * @module       employeeController
 * @file         employee.controller.js
 * @description  employeeController class holds the API methods for routing 
 * @author       Rakesh SR <rakeshsrking@gmail.com>
 * @since        18/06/2021  
-----------------------------------------------------------------------------------------------*/
'use strict';

const service = require('../services/employee.service.js');

//Importing middle ware to validate schema (joi validator)
const { validateInput } = require('../middleware/employee.validation.js');

//ES6-feature: class
class EmployeeController {
  /**
   * function to call the create function from service.js (creates new employee)
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
  addEmployee = (req, res) => {
    try {
      //validation
      const userInputValidation = validateInput.validate(req.body);
      if (userInputValidation.error) {
        return res.status(400).send({
          success: false,
          message: userInputValidation.error.details[0].message,
        });
      }

      //Object for the new employee data
      const newEmployee = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        department: req.body.department,
        salary: req.body.salary,
        company: req.body.company,
      };

      //calling method to add new employee data
      service.addNewEmployee(newEmployee, (err, data) => {
        return err
          ? res.status(500).send({
              success: false,
              message:
                err.message || 'Some error occurred while adding employee',
            })
          : res.status(201).send({
              success: true,
              message: 'Employee added successfully',
              data: data,
            });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred!🎈',
      });
    }
  };

  /**
   * function to call the getAll function that gets all the data, from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
  getAllEmployees = (req, res) => {
    try {
      service.getAllEmp((err, data) => {
        return err
          ? res.status(500).send({
              success: false,
              message: err.message || 'some error occurred',
            })
          : res.status(200).send({
              success: true,
              message: 'Successfully retrieved the employees data',
              data: data,
            });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred!🎆',
      });
    }
  };

  /**
   * function to call the getOne function that gets the required employee data,
   * from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and employee object
   */
  getOneEmployee = (req, res) => {
    const empId = req.params;
    try {
      //calling a function to get the employee with id
      service.getOne(empId, (err, data) => {
        if (!data)
          return res
            .status(404)
            .send({ success: false, message: 'employee not found!🤷🏻‍♀️' });
        return err
          ? res.status(500).send({
              success: false,
              message:
                err.message || 'some error occurred while getting the data',
            })
          : res.status(200).send({
              success: true,
              message: 'Employee retrieved successfully',
              data: data,
            });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred!🧨',
      });
    }
  };

  /**
   * function to call the update function that updates the required employee data,
   * from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
  updateEmployee = (req, res) => {
    try {
      //validation
      const userInputValidation = validateInput.validate(req.body);
      if (userInputValidation.error) {
        return res.status(400).send({
          success: false,
          message: userInputValidation.error.details[0].message,
        });
      }

      //id param for updating exact employee
      const empId = req.params;

      //employee updated details from client
      const updatedDetails = {
        id: req.params.empId,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        department: req.body.department,
        salary: req.body.salary,
        company: req.body.company,
      };

      //calling method to update employee data
      service.update(empId, updatedDetails, (err, data) => {
        return err
          ? res.status(500).send({
              success: false,
              message:
                err.message || 'some error occurred while updating the details',
            })
          : res.status(200).send({
              success: true,
              message: `Details updated for the employee successfully`,
              data: data,
            });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred!🎎',
      });
    }
  };

  /**
   * function to call the remove function that deletes the required employee data,
   * from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
  removeEmployee = (req, res) => {
    //id param for updating exact employee
    const empId = req.params;

    try {
      //calling method to delete employee data
      service.remove(empId, (err, data) => {
        return err
          ? res
              .status(500)
              .send({ success: false, message: 'Some error occurred🤷🏻‍♂️!' })
          : res.status(200).send({
              success: true,
              message: 'Employee deleted successfully',
            });
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: err.message || 'Some error occurred!🎊' });
    }
  };
}

//exporting the class
module.exports = new EmployeeController();
