const Users = require ('../models/donationModel');
const express = require ("express")

const { createNewDonation, getAllDonations,getDonationDetails,getUserDonation,updateDonationStatus, updateDonation} = require("../repository/crud/donation/donation.crud");
const router = express.Router();

// create new  donation
router.post('/', async(req, res, next) => {
    try{
        const result = await createNewDonation(req);
        if(result.status === "success"){
            return res.status(201).json(result)
        }
        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
    
})

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
router.get("/:donationId",async(req,res,next) =>{
    try {
            const result = await getDonationDetails(req);
            if(result.status === "success"){
                res.status(200).json(result)
            }
            res.status(400).json(result)
        }catch(error){
            next(error);
        }
});

//get user donation
router.get("/:donatedBy/userDonation", async (req,res,next) =>{
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
router.patch("/:donationId/updateStatus", async(req,res,next)=> {
    try{
        const result = await updateDonationStatus(req);
        if (result.status==="success"){
            return res.status(200).json(result)
        }
        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
});

router.patch("/:donationId/updateDonation", async(req,res, next) => {
    try{
        const result = await updateDonation(req);
        if(result.status === "success"){
            return res.status(200).json(result)
        }
        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
})



module.exports = router; 