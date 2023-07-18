
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({

    campaignId : {
        type: String,
        required: [true,'Request ID is required'],
        unique: true
    },
    campaignTitle : {
        type: String,
        required: [true,'Campaign Title is required'],

    },
    organisationName: {
        type: String,
        required: [true, 'Requester name is required ']
        
    },
    username: {
        type: String,
        required: [true,'Request type is required']
    },
    email: {
        type: String,
        required : [true, 'Organisation email is required']
    },
    description: {
        type: String,
        required: [false]
    },
    requestStatus: {
        type: String,
        default: 'In Progress'
    },
    target: {
        type: Number,
        required: [true]
    },
    endDate: {
        type: Date,
        required: [false]
    },
    campaignImage:{
        type: String,
        required: [false]
    }}, {timestamps:true})

    const Requests = mongoose.model("Requests",requestSchema);

    module.exports = Requests;

