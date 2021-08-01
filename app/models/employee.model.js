/**
 * @module       EmployeeDataModel
 * @file         employee.models.js
 * @description  EmployeeSchema holds the database Schema 
 * @author       Rakesh SR <rakeshsrking@gmail.com>
 * @since        18/06/2021  
-----------------------------------------------------------------------------------------------*/
'use strict';

// Importing mongoose module
const mongoose = require('mongoose');

//Importing bcrypt
const bcrypt = require('bcrypt');

// Schema for the employee-details
const employeeDataSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      validate: /^[A-Z]{1}[\\sA-Za-z]{2,30}/,
    },
    email: {
      type: String,
      require: true,
      validate:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      unique: true, //<check
    },
    phoneNumber: String,
    department: String,
    salary: String,
    company: String,
  },
  {
    timestamps: true, //to add time stamps
    versionKey: false, //to avoid showing version
  }
);

//comparing passwords for the authentication
employeeDataSchema.methods.comparePasswords = (clientsPassword, callback) => {
  bcrypt.compare(clientsPassword, this.password, (err, matched) => {
    return err ? callback(err, null) : callback(null, matched);
  });
};

//assigning schema to a constant
const employeeDataModel = mongoose.model(
  'employeeDataModel',
  employeeDataSchema
);

// Exporting schema as a module, so that we can directly access the data inside structure.
module.exports = mongoose.model('employeeSchema', employeeDataSchema);

class CRUDOperations {
  //create method
  createEmployee = (newEmployee, callback) => {
    try {
      const employee = new employeeDataModel({
        name: newEmployee.name,
        email: newEmployee.email,
        password: newEmployee.password,
        phoneNumber: newEmployee.phoneNumber,
        department: newEmployee.department,
        salary: newEmployee.salary,
        company: newEmployee.company,
      });

      //to save the new data
      employee.save({}, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  //Get all the data from the server
  findAll = (callback) => {
    try {
      employeeDataModel.find({}, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  //get one employee by id
  getDataById = (empId, callback) => {
    try {
      employeeDataModel.findById(empId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  //update with id
  updateEmpById = (empId, empData, callback) => {

    try {
      employeeDataModel.findByIdAndUpdate(
        empId.empId,
        {
          name: empData.name,
          email: empData.email,
          password: empData.password,
          phoneNumber: empData.phoneNumber,
          department: empData.department,
          salary: empData.salary,
          company: empData.company,
        },
        { new: true },
        (err, data) => {
          return err ? callback(err, null) : callback(null, data);
        }
      );
    } catch (err) {
      callback(err, null);
    }
  };

  //Removing employee with id
  removeEmpById = (empId, callback) => {
    try {
      employeeDataModel.findByIdAndRemove(empId.empId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  //To login
  loginEmp(clientCredentials, callback) {
    employeeDataModel.findOne(
      { email: clientCredentials.email },
      (err, data) => {
        if (err) return callback(err, null);
        else if (!data) return callback('User not found with email', null);
        return callback(null, data);
      }
    );
  }
}

//exporting class
module.exports = new CRUDOperations();