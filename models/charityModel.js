const mongoose = require("mongoose");

const charitySchema = new mongoose.Schema({
    organizationName : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        
    },
    approved: {
        type: Boolean,
        required: true,     
    },
    email : {
        type: String,
        trim: true,
        required: true,
        
    },
    username : {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password : {
        required : true,
        type : String
    },
    contact : {
        required: true,
        type: String,
        trim: true
    },
    location : {
        required: true,
        type: String,
        trim: true
    },
    mission: {
        required: true,
        type : String,
        trim: true
    },
})

const Charities = mongoose.model('Charities',charitySchema);

module.exports = Charities;