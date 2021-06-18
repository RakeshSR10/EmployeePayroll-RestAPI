/**
 * @file         database.config.js
 * @description  Connection details for database 
 * @author       Rakesh SR <rakeshsrking@gmail.com>
 * @since        18/06/2021  
-----------------------------------------------------------------------------------------------*/

const mongoose = require("mongoose");
require('dotenv').config()

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
    })
    .then(() => { console.log("Successfully connected to the database"); })
    .catch(err => { console.log('Could not connect to the database. Exiting now...', err);
                    process.exit();
});