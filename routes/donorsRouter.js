/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const donorsController = require("../controllers/donorsController");
const authController = require("../controllers/authController")


const router = express.Router();

router.post("/signUp", authController.signUp)
router.post("/signIn", authController.signIn)
router.post("/forgotPassword", authController.forgotPassword)
router.patch("/resetPassword/:token", authController.resetPassword)

router
	.route("/")
	.post(donorsController.createDonor)
	.get(authController.protect,donorsController.getAllDonors)

router
	.route("/:username")
	.get(donorsController.getDonor)
	.patch(donorsController.updateDonor)
	.delete(donorsController.deleteDonorAccount)



module.exports = router;