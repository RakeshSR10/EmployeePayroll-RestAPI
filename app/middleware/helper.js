'use strict';

//importing .env file
require('dotenv').config();

//importing bcrypt module
const bcrypt = require('bcrypt');

//importing jsonwebtoken module
const JWT = require('jsonwebtoken');

//ES-6 feature: class
class bcryptHelper {
  /**
   * Generates token
   * @param {object} empData data from the client
   * @returns token
   */
  accessTokenGenerator(empData) {
    return JWT.sign(empData, process.env.PRIVATE_TOKEN, {
      expiresIn: '500000s',
    });
  }

  passwordCheckWithBCrypt(clientPassword, dbSavedPassword) {
    return clientPassword && dbSavedPassword
      ? bcrypt.compareSync(clientPassword, dbSavedPassword)
      : false;
  }
  checkJWToken(req, res, next) {
    const token = req.get('token');

    if (token) {
      JWT.verify(token, process.env.PRIVATE_TOKEN, (err) => {
        if (err) {
          return res.status(400).send({
            success: false,
            message: err.message || 'Invalid token!',
          });
        } else {
          next();
        }
      });
    } else {
      return res.status(401).send({
        success: false,
        message: 'User is not authorized until token is provided!',
      });
    }
  }
}

//exporting module
module.exports = new bcryptHelper();