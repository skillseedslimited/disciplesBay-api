const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlutterwaveSchema = new Schema({
    card_number:{
        type: Number
    },
    cvv:{
        type: Number
    },
    expiry_month:{
        type: Date
    },
    expiry_year:{
        type: Date
    },
    currency:{
        type: String
    },
    amount:{
        type: Number
    },
    redirect_url:{
        type: String
    },
    fullname: {
        type: String
    },
    email:{
        type: String
    },
    phone_number:{
        type: String
    },
    enckey:{
        type:String
    },
    tx_ref:{
        type: String
    }
    
})

module.exports = Flutterwave = mongoose.model('flutterwave', FlutterwaveSchema);