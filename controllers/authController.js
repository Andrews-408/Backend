const catchAsync = require("../Utils/catchAsync")
const Donors = require("../models/donorModel")
const jwt = require('jsonwebtoken');

exports.signUp = catchAsync (async (req, res, next) => {
    const user = await Donors.create(req.body);

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRY
    })

    res.status(201).json({
        status: 'success',
        token,
        data : {
            user
        }
    })
})