const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');
const bcrypt = require('bcryptjs');
 
//load Models
const Role = require('./models/Role');
const Admin = require('./models/Admin');

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
       const password = bcrypt.hashSync(process.env.SUPER_ADMIN_PASSWORD, 10);
       let adminObject = { 
           username : process.env.SUPER_USERNAME,
           email :process.env.SUPER_ADMIN, 
           phoneNumber : "1234567890",
           password 
         }
       
        await  Admin.updateOne({
             email: process.env.SUPER_ADMIN}, 
             adminObject, {upsert: true, setDefaultsOnInsert: true}
             ,  function (error, doc) {
                 console.log("testing")
                 if(!error)
                 {
                    console.log("Admin seeded")

                 }else{
                     console.log(error)
                 }
          });
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

