const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String }, 
  publishDate: { type: Date, default: Date.now },
  thumbnail: { type: String },
  featuredImage: { type: String },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
