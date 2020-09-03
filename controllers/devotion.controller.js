
const Devotion = require('../models/Devotion');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");

const createDevotion = asyncHandler(async(req, res, next) => {
        const devotion = await Devotion.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Devotion created Successfully",
            data: devotion
        });
});



module.exports = {
    createDevotion,
}