'use strict';

// Importing express module
const express = require('express');
var cors = require('cors');

// Importing .env modules and configuring to use attributes in the .env file
require('dotenv').config();

//Importing module to connect to the database
// const connectingToRegisterDatabase = require('./config/user.js');
const connectingToDatabase = require('./config/employeePayroll.js');

//Importing logger
const logger = require('./config/logger');

//Importing swagger-UI
const swaggerUI = require('swagger-ui-express');

//Importing swagger json file for using swagger docs
const swaggerDocs = require('./swagger/swagger.json');

/**
 * Creating express app
 * -> creating an object for the express module/library
 */
const app = express();

// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse request of content-type - application/json
app.use(express.json());

app.use(cors());

//using swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//connecting to database
// connectingToRegisterDatabase.connectToDatabase();
connectingToDatabase.connectToDatabase();

// Defining a simple route to display a welcome message when at the home page.
app.get('/', (req, res) => {
  res.send('Welcome to employee payroll app ');
});

// routes required for the CRUD operations
require('./app/routes/employee.routes.js')(app);

// running a server at port 8000
app.listen(process.env.PORT, () => {
  logger.info('Server running at port number 8000');
  console.log('Server running at port number 8000');
});

module.exports = app;
