const express = require('express');
const Donation = require('../models/Donation');
const Request = require('../models/Request');

const router = express.Router();

// POST /api/donate - Create a donation
router.post('/', async (req, res) => {
  try {
    const { companyName, ngoName, amount, requestId, paymentMethod } = req.body;

    // Validation
    if (!companyName || !ngoName || !amount) {
      return res.status(400).json({ error: 'Missing required fields: companyName, ngoName, amount' });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: 'Amount must be greater than 0' });
    }

    // Check if request exists (if provided)
    if (requestId) {
      const request = await Request.findById(requestId);
      if (!request) {
        return res.status(404).json({ error: 'Request not found' });
      }
    }

    const newDonation = new Donation({
      companyName,
      ngoName,
      amount,
      requestId: requestId || null,
      paymentMethod: paymentMethod || 'credit_card',
    });

    await newDonation.save();

    res.status(201).json({
      success: true,
      message: `Donation of ₹${amount.toLocaleString()} from ${companyName} received successfully!`,
      data: newDonation,
    });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ error: 'Failed to create donation', details: error.message });
  }
});

// GET /api/donate - Get all donations
router.get('/', async (req, res) => {
  try {
    const { ngoName, companyName } = req.query;

    let query = {};

    if (ngoName) {
      query.ngoName = ngoName;
    }

    if (companyName) {
      query.companyName = companyName;
    }

    const donations = await Donation.find(query)
      .populate('requestId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations', details: error.message });
  }
});

// GET /api/donate/stats - Get donation statistics
router.get('/stats/:ngoName', async (req, res) => {
  try {
    const { ngoName } = req.params;

    const donations = await Donation.find({ ngoName });

    const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
    const donationCount = donations.length;
    const avgDonation = donationCount > 0 ? totalAmount / donationCount : 0;

    res.status(200).json({
      success: true,
      data: {
        ngoName,
        totalDonations: totalAmount,
        donationCount,
        averageDonation: Math.round(avgDonation),
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats', details: error.message });
  }
});

module.exports = router;
