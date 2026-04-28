# Smart Resource Allocation Backend

A minimal Node.js + Express + MongoDB backend for the Smart Resource Allocation dashboard supporting volunteer requests, funding requests, and donations.

## 🚀 Quick Setup

### Prerequisites

- Node.js 14+ installed
- MongoDB running locally or MongoDB Atlas URI

### Installation

1. **Navigate to backend directory:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file:**

```bash
# Copy from .env.example
MONGODB_URI=mongodb://localhost:27017/smart-resource-allocation
PORT=5000
NODE_ENV=development
```

4. **Start the server:**

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

Server will run on `http://localhost:5000`

---

## 📊 Database Models

### Request Schema

```javascript
{
  title: String,              // Request title
  description: String,        // Detailed description
  type: String,              // "volunteer" or "funding"
  ngoName: String,           // NGO name (hardcoded: "Helping Hands NGO")
  location: String,          // Location (default: "India")
  skillsRequired: String,    // Skills needed (default: "Any")
  amountNeeded: Number,      // Amount for funding (0 for volunteer)
  volunteersJoined: Number,  // Count of volunteers (default: 0)
  status: String,            // "open" or "closed" (default: "open")
  createdAt: Date,
  updatedAt: Date
}
```

### Donation Schema

```javascript
{
  companyName: String,       // Donating company (hardcoded: "ABC Corp")
  ngoName: String,          // Receiving NGO
  amount: Number,           // Donation amount
  requestId: ObjectId,      // Reference to Request (optional)
  paymentMethod: String,    // "credit_card", "bank_transfer", "csr_wallet"
  status: String,           // "pending", "completed", "failed"
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Routes

### Requests Management

#### POST `/api/requests`

Create a new volunteer or funding request (NGO)

**Request Body:**

```json
{
  "title": "Community Teaching Program",
  "description": "Teaching underprivileged children",
  "type": "volunteer",
  "location": "Mumbai, Maharashtra",
  "skillsRequired": "Teaching",
  "ngoName": "Helping Hands NGO"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Volunteer request created successfully!",
  "data": {
    /* request object */
  }
}
```

#### GET `/api/requests`

Fetch requests filtered by type

**Query Parameters:**

- `type` (optional): "volunteer" or "funding"

**Example:**

```
GET /api/requests?type=volunteer
```

**Response:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    /* array of requests */
  ]
}
```

#### GET `/api/requests/:id`

Get a single request by ID

**Response:**

```json
{
  "success": true,
  "data": {
    /* request object */
  }
}
```

#### POST `/api/requests/:id/accept`

Volunteer accepts a request (increases volunteersJoined by 1)

**Response:**

```json
{
  "success": true,
  "message": "You have successfully joined this initiative!",
  "data": {
    /* updated request object */
  }
}
```

#### POST `/api/requests/:id/close`

Close a request (NGO only)

**Response:**

```json
{
  "success": true,
  "message": "Request closed successfully",
  "data": {
    /* updated request object */
  }
}
```

---

### Donations Management

#### POST `/api/donate`

Create a donation record

**Request Body:**

```json
{
  "companyName": "ABC Corp",
  "ngoName": "Helping Hands NGO",
  "amount": 100000,
  "requestId": "64a5f2c1e8d9b2a3c4d5e6f7",
  "paymentMethod": "credit_card"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Donation of ₹100,000 from ABC Corp received successfully!",
  "data": {
    /* donation object */
  }
}
```

#### GET `/api/donate`

Get all donations (with optional filters)

**Query Parameters:**

- `ngoName` (optional): Filter by NGO
- `companyName` (optional): Filter by company

**Example:**

```
GET /api/donate?ngoName=Helping%20Hands%20NGO
```

**Response:**

```json
{
  "success": true,
  "count": 5,
  "data": [
    /* array of donations */
  ]
}
```

#### GET `/api/donate/stats/:ngoName`

Get donation statistics for an NGO

**Response:**

```json
{
  "success": true,
  "data": {
    "ngoName": "Helping Hands NGO",
    "totalDonations": 500000,
    "donationCount": 5,
    "averageDonation": 100000
  }
}
```

#### GET `/api/health`

Health check endpoint

**Response:**

```json
{
  "status": "Server is running ✅",
  "timestamp": "2024-04-28T10:30:00.000Z"
}
```

---

## 🔗 Frontend Integration

### Frontend API Configuration

```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

### Hardcoded User Identities

- **NGO Dashboard:** "Helping Hands NGO"
- **Volunteer Dashboard:** "User"
- **Company Dashboard:** "ABC Corp"

### Key Integration Points

#### NGO Dashboard

- **Create Request:** POST `/api/requests`
- **Fetch Requests:** GET `/api/requests`
- **Fetch Donations:** GET `/api/donate?ngoName={NGO_NAME}`

#### Volunteer Dashboard

- **Fetch Opportunities:** GET `/api/requests?type=volunteer`
- **Accept Opportunity:** POST `/api/requests/:id/accept`

#### Company Dashboard

- **Fetch Funding Requests:** GET `/api/requests?type=funding`
- **Donate:** POST `/api/donate`
- **Donation History:** GET `/api/donate?companyName={COMPANY_NAME}`

---

## 📝 Example Requests (Using cURL)

### Create Volunteer Request

```bash
curl -X POST http://localhost:5000/api/requests \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Community Teaching",
    "description": "Help teach underprivileged kids",
    "type": "volunteer",
    "ngoName": "Helping Hands NGO",
    "location": "Mumbai",
    "skillsRequired": "Teaching"
  }'
```

### Accept a Request

```bash
curl -X POST http://localhost:5000/api/requests/64a5f2c1e8d9b2a3c4d5e6f7/accept \
  -H "Content-Type: application/json"
```

### Create a Donation

```bash
curl -X POST http://localhost:5000/api/donate \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "ABC Corp",
    "ngoName": "Helping Hands NGO",
    "amount": 100000,
    "paymentMethod": "credit_card"
  }'
```

### Fetch Volunteer Requests

```bash
curl http://localhost:5000/api/requests?type=volunteer
```

---

## 🗄️ MongoDB Setup

### Local MongoDB

```bash
# macOS with Homebrew
brew services start mongodb-community

# Windows
mongod --dbpath "C:\Program Files\MongoDB\Server\data\db"

# Linux
sudo systemctl start mongod
```

### MongoDB Atlas (Cloud)

1. Create account at [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/dbname`
4. Update `.env` file with your URI

---

## 🧪 Testing the Backend

### Health Check

```bash
curl http://localhost:5000/api/health
```

### View All Requests

```bash
curl http://localhost:5000/api/requests
```

### View Volunteer Requests Only

```bash
curl http://localhost:5000/api/requests?type=volunteer
```

### View Funding Requests Only

```bash
curl http://localhost:5000/api/requests?type=funding
```

---

## 📦 Project Structure

```
backend/
├── server.js              # Express server entry point
├── package.json          # Dependencies
├── .env.example          # Environment template
├── models/
│   ├── Request.js        # Volunteer/Funding request schema
│   └── Donation.js       # Donation schema
└── routes/
    ├── requests.js       # Request API endpoints
    └── donations.js      # Donation API endpoints
```

---

## 🔐 Security Notes

**Current Implementation:**

- ✅ CORS enabled for frontend
- ✅ JSON body parsing
- ✅ Basic error handling
- ❌ No authentication (dummy users)
- ❌ No input validation (add later)
- ❌ No rate limiting (add later)

**For Production:**

- Implement JWT authentication
- Add input validation (joi, zod)
- Add rate limiting (express-rate-limit)
- Use environment variables for sensitive data
- Add request logging (morgan)
- Implement proper error codes
- Add unit tests

---

## 🚀 Next Steps

1. **Add Authentication** (JWT tokens)
2. **Implement User Accounts** (real login, password hashing)
3. **Add Input Validation** (joi/zod)
4. **Add Error Boundaries** (frontend)
5. **Setup Real Payment Gateway** (Razorpay, Stripe)
6. **Add Database Seeding** (initial data)
7. **Deploy Backend** (Heroku, AWS, Railway)
8. **Add Unit Tests** (Jest, Mocha)
9. **Add API Documentation** (Swagger/OpenAPI)
10. **Implement Real Geolocation** (Google Maps API)

---

## 📞 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Start MongoDB service or update `MONGODB_URI` in `.env`

### CORS Error in Frontend

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:** CORS is already enabled. Check API_BASE_URL is correct in frontend.

### Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution:** Change PORT in `.env` or kill process on port 5000

### Module Not Found

```
Cannot find module 'express'
```

**Solution:** Run `npm install` in backend directory

---

## 📚 Resources

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Tutorial](https://docs.mongodb.com/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 📄 License

MIT License - Feel free to use for your project.
