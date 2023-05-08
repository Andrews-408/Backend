const express = require("express");
const { protect } = require("./authController");
const { getOrganisationDetails, getAllOrganisations, updateOrganisationAsVerified } = require("../repository/crud/organisation/organisation.crud");

const router = express.Router();

/**
 * get organisation details
 */
router.get("/:organisation_id", protect, async (req, res, next) => {
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
router.post("/:organisation_id/mark-as-verified", protect, async (req, res, next) => {
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

module.exports = router;
