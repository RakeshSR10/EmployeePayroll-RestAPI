'use strict';

//Importing .env library and configuring
require('dotenv').config();
 
//Importing the logger
const logger = require('./logger');

//Importing mongoose library
const mongoose = require('mongoose');

//ES-6feature: class
class ConnectToDatabase{
  //to connect to the database
  connectToDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL_USER, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    //to show some message when the connection made successfully
    mongoose.connection
      .once('open', () => {
        console.log('Successfully connected to the database!');
        logger.info('Successfully connected to the database!');
      })
      .on('error', (err) => {
        logger.error("Couldn't connect to the database...!, Exiting", err);
        process.exit(); //exit from the process
      });
  };
}

//Exporting instance of the class
module.exports = new ConnectToDatabase();