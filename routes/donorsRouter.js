/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const donorsController = require("../controllers/donorsController");
const authController = require("../controllers/authController")
const Donors = require("../models/donorModel")


const router = express.Router();

router.post("/signUp", authController.signUp(Donors))
router.post("/signIn", authController.signIn(Donors))
router.post("/forgotPassword", authController.forgotPassword(Donors))
router.patch("/resetPassword/:token", authController.resetPassword(Donors))
//router.patch("/updatePassword", authController.protect(Donors), authController.updatePassword(Donors))

router
	.route("/")
	.post(donorsController.createDonor)
	.get(authController.protect(Donors),donorsController.getAllDonors)

router
	.route("/:username")
	.get(donorsController.getDonor)
	.patch(donorsController.updateDonor)
	.delete(authController.deactivateUser(Donors))




module.exports = router;