/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const donorsController = require("../controllers/donorsController");
const authController = require("../controllers/authController")
const Users = require("../models/userModel")


const router = express.Router();

router.post("/signUp", authController.signUp(Users))
router.post("/signIn", authController.signIn(Users))
router.post("/forgotPassword", authController.forgotPassword(Users))
router.patch("/resetPassword/:token", authController.resetPassword(Users))
//router.patch("/updatePassword", authController.protect(Donors), authController.updatePassword(Donors))

router
	.route("/donors/")
	.get(donorsController.getAllDonors)


router
	.route("/donors/:username")
	.get(authController.protect(Users),donorsController.getDonor)
	.patch(donorsController.updateDonor)

router
	.route("/donors/:username/updateDonor")
	.patch(authController.protect(Users), authController.restrictTo('Admin'),donorsController.updateDonor)

router
	.route("/donors/:username/deactivateDonor")
	.patch(authController.protect(Users),authController.restrictTo('Admin'),donorsController.deleteDonorAccount)

router
	.route("/donors/:username/activateDonor")
	.patch(authController.protect(Users), authController.restrictTo('Admin'),donorsController.activateDonorAccount)


/**
 * endpoints for Organisation
 */
router.use("/organisations", require('../controllers/organisationController'));

// endpoints for donations
router.use("/donations", require('../controllers/donationController'))

// endpoints for requests
router.use("/requests", require('../controllers/requestController'))

module.exports = router;