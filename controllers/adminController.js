const Admins = require("../models/adminModel");

// get all admins
exports.getAllAdmins = async(req, res) => {
    try{
        const admins = await Admins.find()
        res.status(200).json({
            status: 'success',
            results: admins.length,
            data : {
                admins
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

// get an admin by username
exports.getAdmin = async (req, res) => {
    try{
        const admin = await Admins.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data : {
                admin
            }

        })
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

//update an admin
exports.updateAdmin = async (req, res) => {
    try{
        const admin = await Admins.findOneAndUpdate(req.params.username, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: "success",
            data : {
                admin
            }
        })
    }catch(err){
        res.status(404).json({
            status: "Fail",
            message: err
        })
    }
}


