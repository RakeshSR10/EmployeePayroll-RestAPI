const jwt = require('jsonwebtoken');
//requiring package bcrypt
 const bcrypt = require('bcrypt');

//Creating a class so as to available all functions return in it
class HelperClass {
    /**
     * @description function is return to generate a token when there is a valid user
     * @param valid loginEmployeeData is expected
     * @returns 
     */
    generateToken = (loginEmployeeData) => {
        return jwt.sign(loginEmployeeData, process.env.PRIVATE_TOKEN, {
            expiresIn: '4000s'
        });
    }

    /**
     * @description function compares the password requested by user with 
     * one in data using bcrypt as password in database will be encrypted
     * @param  userData 
     * @param  dbData 
     * @returns 
     */
    bcryptDataCheck(userData, dbData) {
        return (userData && dbData) ? (bcrypt.compareSync(userData, dbData)): false;
    }
    
    tokenDataChecker(req, res, next) {
    let token = req.get("token");
        if (token) {
            jwt.verify(token, process.env.PRIVATE_TOKEN, error => {
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
            return res.send({
                success: false,
                message: "Unauthorized User, Provide token to get authorized!"
            });
        }
    }
}
//exporting the class to utilize or call function created in this class
 module.exports = new HelperClass();