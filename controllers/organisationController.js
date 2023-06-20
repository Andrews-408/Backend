const express = require("express");
const authController = require("./authController");
const Users = require("../models/userModel")
const { getOrganisationDetails, getAllOrganisations, updateOrganisationAsVerified, 
    updateOrganisationAsApproved, UpdateOrganisation, deactivateOrganisation, activateOrganisation, addReviews } = require("../repository/crud/organisation/organisation.crud");

const router = express.Router();

/**
 * get organisation details
 */
router.get("/:username", authController.protect(Users), async (req, res, next) => {
    try {
        const result = await getOrganisationDetails(req);
        if (result.status === "success") {
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * get all organisations
 */
router.get('/',authController.protect(Users), async (req, res, next) => {
    try {
        const result = await getAllOrganisations(
            req.params.skip, req.params.limit
        );
        if (result.status === "success") {
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    } catch (error) {
        next(error);
    }
})

router.patch('/:username/addReviews', async(req, res, next)=> {
    try{
        const result = await addReviews(req)
        if(result.status==="success"){
            return res.status(200).json(result)
        }
        return res.status(400).json(result)
    }catch(err){
        next(err)
    }
})

/**
 * mark organisation as verified
 */
router.patch("/:username/mark-as-verified",authController.protect(Users),authController.restrictTo('Admin'), async (req, res, next) => {
    try {
        const result = await updateOrganisationAsVerified(req);
        if (result.status === "success") {
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    } catch (error) {
        next(error);
    }
});

//approve organisation registration
router.patch("/:username/approve-registration", authController.protect(Users), authController.restrictTo("Admin"), async(req, res, next) => {
    try {
        const result = await updateOrganisationAsApproved(req)
        if(result.status === "success"){
            return res.status(200).json(result);
        }
        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
})
//update organisation details
router.patch("/:username", async(req, res, next)=> {
    try{
        const result = await UpdateOrganisation(req);
        if(result.status === "success"){
            return res.status(200).json(result)
        }

        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
})

router.patch("/:username/deactivateOrganisation" ,authController.protect(Users), authController.restrictTo('Admin') ,async(req, res, next) => {
    try{
        const result = await deactivateOrganisation(req);
        if(result.status === "success"){
            return res.status(204).json(result)
        }
        return res.status(400).json(result)
        
    }catch(error){
        next(error)
    }
})

router.patch("/:username/activateOrganisation" ,authController.protect(Users), authController.restrictTo('Admin'),async(req, res, next) => {
    try{
        const result = await activateOrganisation(req);
        if(result.status === "success"){
            return res.status(204).json(result)
        }
        return res.status(400).json(result)
        
    }catch(error){
        next(error)
    }
})
module.exports = router;
