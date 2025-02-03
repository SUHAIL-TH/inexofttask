const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    empCode: { type: String, unique: true, required: true }, // Added empCode field
});

module.exports = mongoose.model('User', userSchema);
