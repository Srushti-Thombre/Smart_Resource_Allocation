const express = require('express');
const Request = require('../models/Request');

const router = express.Router();

// POST /api/requests - Create a new request (NGO)
router.post('/', async (req, res) => {
  try {
    const { title, description, type, location, skillsRequired, amountNeeded, ngoName } = req.body;

    // Validation
    if (!title || !description || !type || !ngoName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['volunteer', 'funding'].includes(type)) {
      return res.status(400).json({ error: 'Type must be volunteer or funding' });
    }

    const newRequest = new Request({
      title,
      description,
      type,
      ngoName,
      location: location || 'India',
      skillsRequired: skillsRequired || 'Any',
      amountNeeded: type === 'funding' ? amountNeeded || 0 : 0,
    });

    await newRequest.save();

    res.status(201).json({
      success: true,
      message: `${type === 'volunteer' ? 'Volunteer' : 'Funding'} request created successfully!`,
      data: newRequest,
    });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'Failed to create request', details: error.message });
  }
});

// GET /api/requests - Fetch requests by type
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;

    let query = { status: 'open' };

    if (type && ['volunteer', 'funding'].includes(type)) {
      query.type = type;
    }

    const requests = await Request.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Failed to fetch requests', details: error.message });
  }
});

// GET /api/requests/:id - Get single request
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ error: 'Failed to fetch request', details: error.message });
  }
});

// POST /api/requests/:id/accept - Volunteer accepts request
router.post('/:id/accept', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    if (request.status === 'closed') {
      return res.status(400).json({ error: 'This request is closed' });
    }

    request.volunteersJoined += 1;
    await request.save();

    res.status(200).json({
      success: true,
      message: 'You have successfully joined this initiative!',
      data: request,
    });
  } catch (error) {
    console.error('Error accepting request:', error);
    res.status(500).json({ error: 'Failed to accept request', details: error.message });
  }
});

// POST /api/requests/:id/close - Close a request (NGO only)
router.post('/:id/close', async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: 'closed' },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Request closed successfully',
      data: request,
    });
  } catch (error) {
    console.error('Error closing request:', error);
    res.status(500).json({ error: 'Failed to close request', details: error.message });
  }
});

module.exports = router;
