//import .env variables
require('dotenv').config({path: '.env'})
// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('session');
const MongoStore = require('connect-mongo')(session);
const errorHandlers = require('./handlers/errorHandlers');
const port = process.env.PORT || 5000;
//import models
require('./models/User');
require('./models/Cafe');
const router = require('./routes');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise; //use es6 promises
const db = mongoose.connection;
db.on('error', err => {
    console.error(`Failed to connect to database: ${err.message}`);
});

app.use(session({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true})); //allows using inputs w/nested data name="location[address]" ==> location.address
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/', router);

app.use(errorHandlers.notFound);

//mongoose validation errors
app.use(errorHandlers.validationErrors)

app.use(errorHandlers.globalErrorHandler);

app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});
