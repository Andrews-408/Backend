const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    contact: String
})

const Admins = mongoose.model('Admins', adminSchema)

module.exports = Admins;