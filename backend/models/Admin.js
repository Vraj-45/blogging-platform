const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  name: { type: String, default: 'Admin' },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
}, { timestamps: true });

AdminSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('Admin', AdminSchema);
