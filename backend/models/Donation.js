const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    ngoName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request',
      default: null,
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'bank_transfer', 'csr_wallet'],
      default: 'credit_card',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Donation', donationSchema);
