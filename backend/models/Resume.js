const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  filename: { type: String, required: true },
  originalName: { type: String },
  mimetype: { type: String },
  size: { type: Number },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);
