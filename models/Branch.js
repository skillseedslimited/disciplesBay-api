const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
    branchName:{
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
    branchPhone:{
        type:String
    },
    admin:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    }

})

module.exports = Branch = mongoose.model('branch', BranchSchema);