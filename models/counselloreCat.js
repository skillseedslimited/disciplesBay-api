const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConselloreCatSchema = new Schema({
    catType: {
        type: String
    }

})

module.exports = CounsellorCat = mongoose.model('counsellorCat', CounsellorCatSchema);

