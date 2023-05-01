const Admins = require("../models/adminModel");
const catchAsync = require("../Utils/catchAsync")
const AppError =  require("../Utils/appError")
const ApiFeatures = require("../Utils/apiFeatures")

// get all admins
exports.getAllAdmins = catchAsync (async(req, res, next) => {
        const feature = new ApiFeatures(Admins.find(), req.query).filter().sort().setFields()
        const admins = await feature.query
        res.status(200).json({
            status: 'success',
            results: admins.length,
            data : {
                admins
            }
        })
    })

// get an admin by username
exports.getAdmin = catchAsync (async (req, res, next) => {

        const admin = await Admins.findOne({username: req.params.username});

        if(!admin){
            return next(new AppError('Username matches no Admin', 404))
        }

        res.status(200).json({
            status: "success",
            data : {
                admin
            }

        })
   
})

//update an admin
exports.updateAdmin = catchAsync (async (req, res, next) => {
        const admin = await Admins.findOneAndUpdate(req.params.username, req.body, {
            new: true,
            runValidators: true
        })

        if(!admin){
            return next(new AppError('Username matches no Admin', 404));
        }

        res.status(200).json({
            status: "success",
            data : {
                admin
            }
        })
   
})


