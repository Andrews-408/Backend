const express = require('express');
const charityController = require("../controllers/charityController")

const router = express.Router();


router
    .route('/')
    .post(charityController.createCharity)
    .get(charityController.getAllCharities)


router
    .route('/:id')
    .get(charityController.getCharity)
    .patch(charityController.updateCharity)
    .delete(charityController.deleteCharityAccount)


module.exports = router;