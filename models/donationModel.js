const mongoose = require('mongoose');


const donationSchema = new mongoose.Schema({
    donationType : {
        type: String,
        required:[true,'Specify the type of donation']
    },
    donationId : {
        type :String,
        required: [true,'Donation ID is required'],
        unique : true
    },
    donatedBy :{
        type : String,
        required: [true,'Donor name required']
    },
    donatedTo : {
        type : string
    },
    donationStatus: {
        type: string
    },
    date: {
        type: Date,
        required:[false]
    },
    description: {
        type: String,
        required:[false]
    },
    itemPhoto: {
        type: String,
        required:[true]
    },
    location :{
        type : String,
        required: [true,'Please provide location for pick-up']
    },
}, {timestamps : true})


const Donations = mongoose.model("Donations",donationSchema);
module.exports = Donations;