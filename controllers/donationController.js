const Users = require ('../models/donationModel');
const ApiFeatures = require('../Utils/apiFeatures');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const express = require ("express")

const { createNewDonation, getAllDonations,getDonationDetails,getUserDonation,updateDonationStatus} = require("../repository/crud/donation/donation.crud");
const router = express.Router();

// create new  donation
// get all donations
router.get('/',async(req,res,next) => {
    try {
        const result = await getAllDonations(
            req.params.skip, req.params.limit
        );
        if (result.status==="success"){
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    }
    catch(error){
        next(error);
    }
})
 // get donation  details by donationId
router.get("/:donatedId", authController.protect(Users),async(req,res,next) =>{
    try {
        const result = await getDonationDetails(req);{
        result.status(200).json(result);
        }
        return res.status(400).json(result);
        }catch(error){
            next(error);
        }
});

//get user donation
router.get("/:donatedBy",authController.protect(Users),async (req,res,next) =>{
    try{
        const result = await getUserDonation(req);
        if (result==="success"){
            return res.status(200).json(result);
        }
    return res.status(400).json(result);
    }catch(error){
        next(error);   
     }
});

// update donation by donationId
router.patch("/:donationId", async(req,res,next)=> {
    try{
        const result = await updateDonationStatus(req);
        if (result.status==="success"){
            return res.status(200).json(result)
        }
    }catch(error){
        next(error)
    }
});

module.exports = router; 