const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestreamSchema = new Schema({
    client_id:{
        type: String
    },
    response_type:{
        type: String
    },
    redirect_uri:{
        type:String
    },
    state:{
        type:String
    },
    code:{
        type: String
    }
})

module.exports = Restream = mongoose.model('restream', RestreamSchema);