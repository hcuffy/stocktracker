const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  symbol: String,
  data: []
}, {
  timestamps: true
});

const ModelClass = mongoose.model('stock', StockSchema);
module.exports = ModelClass
