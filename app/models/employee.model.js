/**
 * @module       EmployeeDataModel
 * @file         employee.models.js
 * @description  EmpSchema holds the database Schema 
 * @author       Rakesh SR <rakeshsrking@gmail.com>
 * @since        18/06/2021  
-----------------------------------------------------------------------------------------------*/

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EmployeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},{
    timestamp: true
})

EmployeeSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const Register = mongoose.model('Register', EmployeeSchema);

class EmployeeDataModel {

    /**
     * @description register user in the database
     * @param employee 
     * @param callback 
     */

    createEmpDetails = (employee, callback) => {
        const employeeSchema = new Register({
            firstName: employee.firstName,
            lastName: employee.lastName,
            emailId: employee.emailId,
            password: employee.password,
        });
        employeeSchema.save(callback)
    };

    /**
     * @description login user from the database
     * @param loginEmployeeData
     * @param callback for service
     */

     loginEmpDetails = (loginEmployeeData, callBack) => {
        Register.findOne({'emailId': loginEmployeeData.emailId},(error, data) => {
            if(error){
                return callBack(error, null);
            }else if(!data){
                return callBack("Invalid email and password..!", null);
            }
            return callBack(null, data);
        })
    };
}

module.exports = new EmployeeDataModel();