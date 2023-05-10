const express = require("express");
const authController = require("./authController");
const Users = require("../models/userModel")
const { getOrganisationDetails, getAllOrganisations, updateOrganisationAsVerified, updateOrganisationAsApproved, UpdateOrganisation } = require("../repository/crud/organisation/organisation.crud");

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
router.get('/', async (req, res, next) => {
    try {
        const result = await getAllOrganisations(
            req.params.skip, req.params.limit
        );
        if (result === "success") {
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    } catch (error) {
        next(error);
    }
})

/**
 * mark organisation as verified
 */
router.patch("/:username/mark-as-verified", authController.protect(Users), async (req, res, next) => {
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

router.patch("/:username/approve-registration", authController.protect(Users), async(req, res, next) => {
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

router.patch("/:username", async(req, res, next)=> {
    try{
        const result = await UpdateOrganisation(req);
        if(result.status === "success"){
            return res.status(200).json(result)
        }
    }catch(error){
        next(error)
    }
})
module.exports = router;
