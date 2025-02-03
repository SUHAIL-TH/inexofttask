const mongoose = require('mongoose');

const backupUserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    empCode: { type: String, unique: true, required: true },
});

module.exports = mongoose.model('BackupUser', backupUserSchema);
