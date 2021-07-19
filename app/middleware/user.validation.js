'use strict'

//importing property/function for joi
const { string } = require('@hapi/joi');
 
//importing joi module
const Joi = require('@hapi/joi');

//joi validating object
const validateInput = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp('^[A-Z]{1}[A-Za-z]{2,30}'))
    .required(),
  lastName: Joi.string()
    .min(2)
    .max(30)
    .pattern(new RegExp('^[A-Za-z]{2,30}'))
    .required(),
  email: Joi.string()
    .pattern(
      new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      )
    )
    .required(),
    password: Joi.string().min(8).max(20).pattern(new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$")).required(),
});

//exporting module
module.exports = { validateInput };
