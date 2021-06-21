const jwt = require('jsonwebtoken');

//requiring package bcrypt
 const bcrypt = require('bcrypt');

//Creating a class so as to available all functions return in it
class HelperClass {
    generateAccessToken(employeeData) {
        return jwt.sign(employeeData, SECRET_TOKEN, {
            expiresIn: '1800s'
        });
    }

    bcryptDataCheck(userData, dbData) {
        return (userData && dbData) ? (!bcrypt.compareSync(userData, dbData)): false;
    }
    
    tokenChecker(req, res, next) {
    let token = req.get("token");
        if (token) {
            jwt.verify(token, SECRET_TOKEN, error => {
                if (error) {
                    console.log(error);
                    return res.status(400).send({
                        success: false,
                        message: "Token is Invalid!"
                    });
                } else {
                    next();
                }
            });
        } else {
            return res.status(401).send({
                success: false,
                message: "Unauthorized User, Provide token to get authorized!"
            });
        }
    }
}

//exporting the class to utilize or call function created in this class
 module.exports = new HelperClass();