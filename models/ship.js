const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
  name: String,
  type: String,
  status: {
    type: String,
    enum: ['venter', 'igang', 'færdig']
  }
});

module.exports = mongoose.model('Ship', shipSchema);
