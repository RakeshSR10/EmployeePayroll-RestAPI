'use strict';

//Importing functions from winston
const { createLogger, transports, format } = require('winston');

//Creating logger object
const logger = createLogger({
  transports: [
    new transports.File({
      filename: './log files/info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),

    //to print/send errors to the file
    new transports.File({
      filename: './log files/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],

  //setting winston to not exit on error
  exitOnError: false,
});

//exporting the logger
module.exports = logger;