const express =  require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const dotenv = require('dotenv').config();
const colors = require('colors');

// Global error handlers
const errorHandler = require('./middleware/error');
const {cloudinaryConfig} = require('./config/cloudinary.config');

const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('*', cloudinaryConfig)

// Routes config
require('./routers/index.routes')(app);
app.use(errorHandler);

// DB config
const db = require('./config/keys').mongoURL;

// connect to mongoDB
mongoose
    .connect(db, {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(conn => console.log(`mongodb connected successfully:${conn.connection.host}`.cyan.underline.bold))
    .catch(err => console.log(`Server connection error: ${err.message}`.red));


const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`server running on port ${port}!!`.yellow.bold));

//catch any unhandled rejection error
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server & exit process
   // server.close(() => process.exit(1));

})
