const Admins = require("../models/adminModel");


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

exports.getAdmin = async (req, res) => {
    try{
        const admin = await Admins.find({_id : req.params.id});
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