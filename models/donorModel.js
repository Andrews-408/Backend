const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')


const donorSchema = new mongoose.Schema({
	firstName : {
		type: String,
		required: [true , 'FirstName is required']
	},
	lastName : {
		type : String,
		required : [true , 'LastName is required']
	},
	username : {
		type : String,
		required: [true, 'Username is required'],
		unique : true
	},
	email : {
		type : String,
		required : [true, 'User email is required'],
		unique : true,
		lowercase : true,
		validate : [validator.isEmail, 'Provide a valid email']
		
	},
	photo : String,
	password: {
		type: String,
		required: [true, 'Provide a password'],
		minlength: 8
	},
	passwordConfirm : {
		type: String,
		required: [true, 'Provide password confirmation'],
		validate : {
			validator: function(el){
				return el === this.password;
			},
			message: 'Password mismatch'
		}
	},
	location : {
		type : String,
		required: [true, 'Location is required'],
	},
	contact : {
		type : String,
		required: [true, 'Contact is required'],
	},
	createdAt : {
		type: Date,
		default: new Date().toISOString()
	},
	isActive : {
		type: Boolean,
		default: true
	}
})

donorSchema.pre('save', async function(next){
	// checks if password is not modified
	if(!this.isModified('password')) return next();

	// encrypts password
	this.password = await bcrypt.hash(this.password, 12);

	// removes passwordConfirm field from the document
	this.passwordConfirm = undefined
	next()
})
	

const Donors = mongoose.model("Donors", donorSchema);

module.exports = Donors;