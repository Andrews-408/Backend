/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const donorsController = require("../controllers/donorsController");


const router = express.Router();

router
	.route("/")
	.post(donorsController.createDonor)
	.get(donorsController.getAllDonors)

router
	.route("/:id")
	.get(donorsController.getDonor)



module.exports = router;