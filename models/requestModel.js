
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({

    requestId : {
        type: String,
        required: [true,'Request ID is required'],
        unique: true
    },

    requestedBy: {
        type: String,
        required: [true, 'Requester name is required ']
        
    },

    requestType: {
        type: String,
        required: [true,'Request type is required']
    },
    requestTo:{
        type: String,
        required: [false,'']
    },

    description: {
        type: String,
        required: [false]
    },
    requestStatus: {
        type: String,
        default: 'Pending'
    },
    requestImage:{
        type: String,
        required: [false]
    }}, {timestamps:true})

    const Requests = mongoose.model("Requests",requestSchema);
    module.exports = Requests;

