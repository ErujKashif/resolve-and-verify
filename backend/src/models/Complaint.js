const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  citizen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  beforePhoto: {
    type: String, // URL or base64 (we'll store as base64 for simplicity)
    required: true,
  },
  afterPhoto: {
    type: String, // URL or base64 (only after resolution)
    default: null,
  },
  status: {
    type: String,
    enum: ['Open', 'Assigned', 'Resolved', 'Reopened', 'Closed', 'Escalated'],
    default: 'Open',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  resolvedAt: {
    type: Date,
    default: null,
  },
  verifiedByCitizen: {
    type: Boolean,
    default: null, // true = yes, false = no, null = pending
  },
  escalatedAt: {
    type: Date,
    default: null,
  },
  penaltyAmount: {
    type: Number,
    default: 0,
  },
  penaltyRecordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
complaintSchema.index({ status: 1, assignedTo: 1 });
complaintSchema.index({ citizen: 1 });
complaintSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Complaint', complaintSchema);