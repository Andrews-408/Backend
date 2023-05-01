const express = require('express');
const adminController = require("../controllers/adminController")
const authController = require("../controllers/authController")


const router = express.Router();

router.post("/signIn", authController.adminSignIn)

router
    .route("/")
    .get(adminController.getAllAdmins)

router
    .route("/:username")
    .get(adminController.getAdmin)
    .patch(adminController.updateAdmin)

module.exports = router;