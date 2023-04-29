const mongoose = require('mongoose');
const validators = require('validators')

const donorSchema = new mongoose.Schema({
	firstName : {
		required : true,
		type: String,
	},
	lastName: {
		required : true,
		type: String,
	},
	username: {
		required : true,
		type: String,
		unique: true
	},
	email: {
		required : true,
		type: String,
		
	},
	password: {
		required : true,
		type: String,
	},
	contact: {
		type: String,
		required: true
	},
	location: {
		required : true,
		type: String,
	}
});

const Donors = mongoose.model("Donors", donorSchema);

module.exports = Donors;