const express = require('express');
const adminController = require("../controllers/adminController")


const router = express.Router();
router
    .route("/")
    .get(adminController.getAllAdmins)

router
    .route("/:id")
    .get(adminController.getAdmin)
    .patch(adminController.updateAdmin)

module.exports = router;