const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name:{
        type: String
    },
    state:{
        type:String
    },
    street:{
        type:String
    },
    country:{
        type:String
    },
    HOD:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    }

})

module.exports = Department = mongoose.model('department', DepartmentSchema);