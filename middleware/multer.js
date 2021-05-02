const multer = require('multer');
const DataUriParser = require('datauri/parser');
const path = require('path');

const storage = multer.memoryStorage();
const parser = new DataUriParser();

const multerUploads = multer({ storage }).single('image');


const dataUri = req => {
    console.log(here)
    return parser.format(path.extname(req.image.originalname).toString(), req.image.buffer);
}


module.exports = { multerUploads, dataUri};