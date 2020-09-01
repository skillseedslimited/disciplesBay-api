const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');
 
//load Models
const Role = require('./models/Role');

//connect to db
mongoose.connect(process.env.mongoURL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

//read JSON files
const roles = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/roles.json`, 'utf-8')
);

//Import data
const importData = async () => {
    try{
       await Role.create(roles);
        console.log("Data imported".green.inverse);
        process.exit();
    }catch(err){
        console.log(err)
    }
}

//Delete imported data
const deleteData = async () => {
    try{
       await Role.deleteMany();
        console.log("Data destroyed".red.inverse);
        process.exit();
    }catch(err){
        console.log(err)
    }
}
//select which seeder process to run -i or -d
if(process.argv[2] === "-i"){
    importData();
}else if(process.argv[2] === "-d"){
    deleteData();
}

