const express = require("express")
const authController = require("./authController");
const Users = require("../models/userModel")
const { createNewDonation, getAllDonations, getDonationDetails,
    acceptDonation, updateDonation, approveDonation, getCampaignDonations } = require("../repository/crud/donation/donation.crud");

const router = express.Router();

// create new  donation
router.post('/', authController.protect(Users), async (req, res, next) => {
    try {
        const result = await createNewDonation(req);
        if (result.status === "success") {
            return res.status(201).json(result)
        }
        return res.status(400).json(result)
    }catch (error) {
        next(error)
    }

})

//get all donations for a specific campaign
router.get('/:campaignId', async (req, res, next) => {
    try {
        const result = await getCampaignDonations(req);
        if (result.status === "success") {
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    }
    catch (error) {
        next(error);
    }
})


// get all donations
router.get('/', async (req, res, next) => {
    try {
        const result = await getAllDonations(
            req.params.skip, req.params.limit
        );
        if (result.status === "success") {
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    }
    catch (error) {
        next(error);
    }
})

// get donation  details by donationId
router.get("/:donationId", async (req, res, next) => {
    try {
        const result = await getDonationDetails(req);
        if (result.status === "success") {
            res.status(200).json(result)
        }
        res.status(400).json(result)
    } catch (error) {
        next(error);
    }
});



// accept donation by donor
router.patch("/:donationId/acceptDonation", authController.protect(Users), async (req, res, next) => {
    try {
        const result = await acceptDonation(req);
        if (result.status === "success") {
            return res.status(200).json(result)
        }
        return res.status(400).json(result)
    } catch (error) {
        next(error)
    }
});

// approve donation by admin
router.patch("/:donationId/approveDonation", authController.protect(Users), authController.restrictTo('Admin'), async (req, res, next) => {
    try {
        const result = await approveDonation(req);
        if (result.status === "success") {
            return res.status(200).json(result)
        }
        return res.status(400).json(result)
    } catch (error) {
        next(error)
    }
});

//updates donation by donationId
router.patch("/:donationId/updateDonation", async (req, res, next) => {
    try {
        const result = await updateDonation(req);
        if (result.status === "success") {
            return res.status(200).json(result)
        }
        return res.status(400).json(result)
    } catch (error) {
        next(error)
    }
})


module.exports = router; 