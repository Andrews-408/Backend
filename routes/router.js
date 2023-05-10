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
	.get(donorsController.getDonor)
	.patch(donorsController.updateDonor)
	.delete(authController.deactivateUser(Users))


/**
 * endpoints for Organisation
 */
router.use("/organisations", require('../controllers/organisationController'));

module.exports = router;