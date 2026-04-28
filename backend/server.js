const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ========================
// MIDDLEWARE
// ========================
app.use(cors());
app.use(express.json());

// ========================
// IN-MEMORY STORAGE
// ========================
let requests = [];
let donations = [];

// Helper: Generate unique ID
const generateId = () => Date.now().toString();

// Helper: Find request by ID
const findRequestById = (id) => requests.find(r => r.id === id);

// ========================
// REQUEST ENDPOINTS
// ========================

// POST /api/requests - Create new request
app.post('/api/requests', (req, res) => {
  try {
    const { title, description, type, ngoName, location, skillsRequired, amountNeeded } = req.body;

    // Validation
    if (!title || !description || !type || !ngoName) {
      return res.status(400).json({ error: 'Missing required fields: title, description, type, ngoName' });
    }

    if (!['volunteer', 'funding'].includes(type)) {
      return res.status(400).json({ error: 'Type must be "volunteer" or "funding"' });
    }

    const newRequest = {
      id: generateId(),
      title,
      description,
      type,
      ngoName,
      location: location || '',
      skillsRequired: skillsRequired || '',
      amountNeeded: amountNeeded || 0,
      volunteersJoined: 0,
      status: 'open',
      createdAt: new Date()
    };

    requests.push(newRequest);
    return res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    return res.status(500).json({ error: 'Failed to create request' });
  }
});

// GET /api/requests - Get all requests (with optional type filter)
app.get('/api/requests', (req, res) => {
  try {
    const { type } = req.query;

    if (type) {
      if (!['volunteer', 'funding'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type' });
      }
      const filtered = requests.filter(r => r.type === type);
      return res.json({
        count: filtered.length,
        data: filtered
      });
    }

    return res.json({
      count: requests.length,
      data: requests
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// GET /api/requests/:id - Get single request
app.get('/api/requests/:id', (req, res) => {
  try {
    const request = findRequestById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    return res.json(request);
  } catch (error) {
    console.error('Error fetching request:', error);
    return res.status(500).json({ error: 'Failed to fetch request' });
  }
});

// POST /api/requests/:id/accept - Volunteer accepts request
app.post('/api/requests/:id/accept', (req, res) => {
  try {
    const request = findRequestById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.volunteersJoined += 1;
    return res.json(request);
  } catch (error) {
    console.error('Error accepting request:', error);
    return res.status(500).json({ error: 'Failed to accept request' });
  }
});

// POST /api/requests/:id/close - Close request
app.post('/api/requests/:id/close', (req, res) => {
  try {
    const request = findRequestById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = 'closed';
    return res.json(request);
  } catch (error) {
    console.error('Error closing request:', error);
    return res.status(500).json({ error: 'Failed to close request' });
  }
});

// ========================
// DONATION ENDPOINTS
// ========================

// POST /api/donate - Create donation
app.post('/api/donate', (req, res) => {
  try {
    const { companyName, ngoName, amount, requestId, paymentMethod } = req.body;

    // Validation
    if (!companyName || !ngoName || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Missing or invalid required fields' });
    }

    const newDonation = {
      id: generateId(),
      companyName,
      ngoName,
      amount,
      requestId: requestId || null,
      paymentMethod: paymentMethod || 'credit_card',
      status: 'completed',
      createdAt: new Date()
    };

    donations.push(newDonation);
    return res.status(201).json(newDonation);
  } catch (error) {
    console.error('Error creating donation:', error);
    return res.status(500).json({ error: 'Failed to create donation' });
  }
});

// GET /api/donate - Get donations (with optional filtering)
app.get('/api/donate', (req, res) => {
  try {
    const { ngoName, companyName } = req.query;

    let filtered = donations;

    if (ngoName) {
      filtered = filtered.filter(d => d.ngoName === ngoName);
    }

    if (companyName) {
      filtered = filtered.filter(d => d.companyName === companyName);
    }

    return res.json({
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// GET /api/donate/stats/:ngoName - Get donation stats for NGO
app.get('/api/donate/stats/:ngoName', (req, res) => {
  try {
    const { ngoName } = req.params;

    const ngoDonations = donations.filter(d => d.ngoName === ngoName);

    const totalAmount = ngoDonations.reduce((sum, d) => sum + d.amount, 0);
    const donationCount = ngoDonations.length;
    const averageDonation = donationCount > 0 ? totalAmount / donationCount : 0;

    return res.json({
      ngoName,
      totalAmount,
      donationCount,
      averageDonation: Math.round(averageDonation)
    });
  } catch (error) {
    console.error('Error fetching donation stats:', error);
    return res.status(500).json({ error: 'Failed to fetch donation stats' });
  }
});

// ========================
// HEALTH CHECK
// ========================

app.get('/api/health', (req, res) => {
  return res.json({ 
    status: 'OK', 
    message: 'Server is running (in-memory demo)',
    requestCount: requests.length,
    donationCount: donations.length
  });
});

// ========================
// START SERVER
// ========================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📊 Using in-memory storage (demo mode)');
  console.log('⚠️  Data will be lost on server restart');
});
