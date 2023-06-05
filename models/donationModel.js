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
        type : String
    },
    donationStatus: {
        type: String,
        default: 'pending'
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