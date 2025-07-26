const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  producerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  qualityTier: String,
  quantity: Number,
  location: String,
});

module.exports = mongoose.model('Product', productSchema);
