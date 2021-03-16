const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestimonyCategorySchema = new Schema({
    name:{
        type: String
    },
});

module.exports = TestimonyCategory = mongoose.model('testimonyCategory', TestimonyCategorySchema);

