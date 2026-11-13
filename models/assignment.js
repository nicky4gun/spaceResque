const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    mission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mission',
      required: true,
      unique: true
    },
    ship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ship',
      required: true
    },
    status: {
      type: String,
      enum: ['aktiv', 'færdig'],
      default: 'aktiv'
    }
  },
  { timestamps: true }
);

assignmentSchema.index(
  { ship: 1 },
  { unique: true, partialFilterExpression: { status: 'aktiv' } }
);

module.exports = mongoose.model('Assignment', assignmentSchema);
