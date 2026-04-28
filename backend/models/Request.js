const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['volunteer', 'funding'],
      required: true,
    },
    ngoName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: 'India',
    },
    skillsRequired: {
      type: String,
      default: 'Any',
    },
    amountNeeded: {
      type: Number,
      default: 0,
    },
    volunteersJoined: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Request', requestSchema);
