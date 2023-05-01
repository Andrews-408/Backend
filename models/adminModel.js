const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const adminSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
        minlength: 8,
        select: false
    },
    email: {
        required : true,
        type: String,
        unique: true,
        validate : [validator.isEmail, 'Provide a valid Email']
        
    },
    contact: String
})

adminSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)

})

adminSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

const Admins = mongoose.model('Admins', adminSchema)

module.exports = Admins;