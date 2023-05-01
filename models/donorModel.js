const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')


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
		minlength: 8,
		select: false
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
	},
	passwordChangedAt : Date,
	passwordResetToken : String,
	passwordResetExpires: Date
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

donorSchema.pre('save', function(next){
	if(!this.isModified('password') || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
})

donorSchema.methods.correctPassword = async function(candidatePassword, userPassword){
	return await bcrypt.compare(candidatePassword, userPassword)
}

donorSchema.methods.passwordChangedAfter = function(JWTTimeStamp){
	if(this.passwordChangedAt){
		const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10);

		console.log(changedTimeStamp, JWTTimeStamp);
		// returns true if password has been changed
		return JWTTimeStamp < changedTimeStamp
	}

	// password not changed	
	return false
}

donorSchema.methods.createPasswordResetToken = function(){
	const resetToken = crypto.randomBytes(32).toString('hex')

	this.passwordResetToken = crypto
								.createHash('sha256')
								.update(resetToken)
								.digest('hex')

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	console.log({resetToken}, this.passwordResetToken)

	return resetToken;
}

const Donors = mongoose.model("Donors", donorSchema);

module.exports = Donors;