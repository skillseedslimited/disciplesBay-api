const express =  require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();
const colors = require('colors');

// Global error handlers
const errorHandler = require('./middlewares/error');

const app = express();


// configuring routes



// configuring routes
const defaultRoutes = require('./routers/api/defaultRoute');
const adminRoutes = require('./routers/api/adminRoute');
const userRoutes = require('./routers/api/userRoute');




// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURL;

// connect to mongoDB
mongoose
    .connect(db, {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(conn => console.log(`mongodb connected successfully:${conn.connection.host}`.cyan.underline.bold))
    .catch(err => console.log(`Server connection error: ${err.message}`.red));


// 
app.use("/api/v1", defaultRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);
app.use(errorHandler);


const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`server running on port ${port}!!`.yellow.bold));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server & exit process
   // server.close(() => process.exit(1));

})
