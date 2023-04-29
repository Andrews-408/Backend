const Charities = require('../models/charityModel');
const ApiFeatures = require('../Utils/apiFeatures')

// register new charity foundation
exports.createCharity = async (req, res) =>{
    try{
        const newCharity = await Charities.create(req.body);
        
        res.status(201).json({
            status: 'Success',
            data : {
                newCharity
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'Fail',
            message: err
        })
    }
}

// get all registered charities
exports.getAllCharities = async (req, res) => {
    try{

        const features = new ApiFeatures(Charities.find(), req.query).filter().sort().setFields()

        const charities = await features.query;

        

        //response
        res.status(200).json({
            status: "Success",
            results : charities.length,
            data : {
                charities
            }
        })
    }catch(err){
        res.status(404).json({
            status: "Fail",
            message : err
        })
    }
};

// get charity by username
exports.getCharity = async (req, res) =>{
    try{
        const charity = await Charities.findById(req.params.id)
        res.status(200).json({
            status: "Success",
            data : {
                charity
            }
        })
    }catch(err){
        res.status(404).json({
            status : "error",
            message : err
        })
    }
}

// update charity
exports.updateCharity = async (req, res) => {
    try{
        const updatedCharity = await Charities.findOneAndUpdate({username: req.params.username}, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: "success",
            data : {
                updatedCharity
            }
        })
    }catch(err){
        res.status(404).json({
            status: "Fail",
            message: err
        })
    }
}


// delete charity from the DB
exports.deleteCharityAccount = async(req, res) => {
    try{
        await Charities.findOneAndDelete({username: req.params.username});
        res.status(204).json({
            status: "Successfully Deleted",
            data : {
            }
        })
    }catch(err){
        res.status(404).json({
            status: "Fail",
            message : err
        })
    }
}
