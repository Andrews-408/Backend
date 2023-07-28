const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donationId : {
        type :String,
        required: [true,'Donation ID is required'],
        unique : true
    },
    campaignId : {
        type: String,
        required: [true, "Campaign ID is required"]
    },
    donatedBy :{
        type : String,
        required: [true,'Donor name required']
    },
    donorEmail : {
        type: String,
        required: [true, "Donor Email is required"]
    },
    organisationEmail : {
        type: String,
        required: [true, "Organisation Email is required"]
    },
    organisationContact: {
        type: String,
        required: [true, "Organisation Contact is required"]
    },
    donatedTo : {
        type : String,
        required: false
    },
    donationStatus: {
        type: String,
        default: 'In Progress'
    },
    contact : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:[false]
    },
    quantity : {
        type: Number, 
        required : [true]
    },
    itemPhoto: {
        type: String,
        required:[false, "Upload images of the items u are donating"]
    },
    location :{
        type : String,
        required: [false,'Please provide location for pick-up']
    },
    deliveryMethod: {
        type: String,
        required : [true, 'Please provide method of delivery']
    },
    received : {
        type: Boolean,
        default: false,
        required: [false]
    },
    delivered: {
        type: Boolean,
        default: false,
        required: [false]
    },
    deliveryDate: {
        type : Date,
        required: [false]
    }
    ,
    deliveryDetails: {
        type : String,
        required: [false]
    }
    ,
    deliveryMode: {
        type : String,
        required: [false]
    }
}, {timestamps : true})


const Donations = mongoose.model("Donations",donationSchema);
module.exports = Donations;