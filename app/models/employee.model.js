const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

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
        required: true
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
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
})

const Register = mongoose.model('Register', EmployeeSchema);

class EmployeeDataModel {
    
    createEmpDetails = (employee, callback) => {
        const employeeSchema = new Register({
            firstName: employee.firstName,
            lastName: employee.lastName,
            emailId: employee.emailId,
            password: employee.password
        });
        employeeSchema.save(callback)
    };
}

module.exports = new EmployeeDataModel();