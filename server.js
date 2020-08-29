const express =  require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();
const colors = require('colors');

// Global error handlers
const errorHandler = require('./middlewares/error');

const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes config
require('./routers/api/index')(app);
app.use(errorHandler);

// DB config
const db = require('./config/keys').mongoURL;

// connect to mongoDB
mongoose
    .connect(db, {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(conn => console.log(`mongodb connected successfully:${conn.connection.host}`.cyan.underline.bold))
    .catch(err => console.log(`Server connection error: ${err.message}`.red));





const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`server running on port ${port}!!`.yellow.bold));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server & exit process
   // server.close(() => process.exit(1));

})
