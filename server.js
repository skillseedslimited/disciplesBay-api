const express =  require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');

const app = express();


// configuring routes




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
    .then(() => console.log('mongodb connected successfully!'))
    .catch(err => console.log(err));






const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server running on port ${port}!!`));
