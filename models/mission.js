const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  title: String,
  destination: String,
  description: String,
  status: {
    type: String,
    enum: ['venter', 'igang', 'færdig']
  }
});

module.exports = mongoose.model('Mission', missionSchema);
