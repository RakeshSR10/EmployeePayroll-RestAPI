/**
 * @module       EmployeeDataModel
 * @file         employee.models.js
 * @description  EmployeeSchema holds the database Schema 
 * @author       Rakesh SR <rakeshsrking@gmail.com>
 * @since        18/06/2021  
-----------------------------------------------------------------------------------------------*/
//requiring the mongoose package to connect to mongodb DataBase
const mongoose = require('mongoose');
//Authenticate password using bcrypt
const bcrypt = require('bcrypt');

//Schema for store data into the Database
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
    //generates the Time Stamp for data has been added
    timestamp: true
})
EmployeeSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})
const employeeRegister = mongoose.model('Register', EmployeeSchema);

//create a class to write functions
class EmployeeDataModel {
    /**
     * @description register user in the database
     * @param employee 
     * @param callback 
     */
    createEmpDetails = (employee, callback) => {
        const employeeSchema = new employeeRegister({
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
        employeeRegister.findOne({'emailId': loginEmployeeData.emailId},(error, data) => {
            if(error){
                return callBack(error, null);
            }else if(!data){
                return callBack("Invalid credentials..! Please re-enter", null);
            }
            return callBack(null, data);
        })
    };
}
//exporting the class to utilize function created in this class
module.exports = new EmployeeDataModel();