# Smart Resource Allocation - Complete Setup Guide

A modern React + Node.js dashboard application with royal premium theme for NGOs, volunteers, and companies.

## 📋 Project Overview

This application has:

- **Frontend:** React + Tailwind CSS + Vite (port 5173)
- **Backend:** Node.js + Express + MongoDB (port 5000)
- **Features:** Volunteer requests, funding requests, donations, user dashboards

---

## 🚀 Quick Start (Both Frontend & Backend)

### Step 1: Install Dependencies

```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Setup Environment

**Backend `.env` file:**

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```
MONGODB_URI=mongodb://localhost:27017/smart-resource-allocation
PORT=5000
NODE_ENV=development
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**

```bash
# macOS
brew services start mongodb-community

# Windows (in Command Prompt as admin)
net start MongoDB

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**

1. Create account: [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster and get connection string
3. Update `.env` with your URI

### Step 4: Start the Backend

```bash
cd backend
npm run dev
# Server running on http://localhost:5000
```

### Step 5: Start the Frontend (new terminal)

```bash
npm run dev
# App running on http://localhost:5173
```

### Step 6: Access the Application

Open your browser and visit:

- **Landing Page:** http://localhost:5173
- **NGO Dashboard:** http://localhost:5173/ngo-dashboard
- **Volunteer Dashboard:** http://localhost:5173/volunteer-dashboard
- **Company Dashboard:** http://localhost:5173/company-dashboard

---

## 🎯 User Roles & Dummy Data

### NGO Dashboard (`/ngo-dashboard`)

- **Name:** Helping Hands NGO
- **Capabilities:**
  - Create volunteer requests
  - Create funding requests
  - View all donations received
  - Track active requests

### Volunteer Dashboard (`/volunteer-dashboard`)

- **Name:** User
- **Capabilities:**
  - Browse volunteer opportunities
  - Accept volunteer requests
  - View contribution history
  - Earn certificates

### Company Dashboard (`/company-dashboard`)

- **Name:** ABC Corp
- **Capabilities:**
  - Browse funding requests
  - Donate to NGOs
  - View donation history
  - Track impact metrics

---

## 📁 Project Structure

```
Smart_Resource_Allocation/
├── src/
│   ├── pages/
│   │   ├── NGODashboard.jsx          [API integrated]
│   │   ├── VolunteerDashboard.jsx    [API integrated]
│   │   ├── CompanyDashboard.jsx      [API integrated]
│   │   └── LandingPage.jsx
│   ├── components/
│   │   ├── DashboardLayout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── StatsCard.jsx
│   │   └── ... (other components)
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── backend/
│   ├── server.js               ✨ NEW
│   ├── package.json            ✨ NEW
│   ├── .env.example            ✨ NEW
│   ├── models/
│   │   ├── Request.js          ✨ NEW
│   │   └── Donation.js         ✨ NEW
│   ├── routes/
│   │   ├── requests.js         ✨ NEW
│   │   └── donations.js        ✨ NEW
│   └── README.md               ✨ NEW
├── package.json
├── vite.config.js
├── tailwind.config.js
└── ... (config files)
```

---

## 🔌 Frontend-Backend Integration

### API Base URL

```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

### Key Integrations

#### NGO Dashboard

```
Create Request         → POST /api/requests
Fetch Requests         → GET /api/requests
Fetch Donations        → GET /api/donate?ngoName=Helping Hands NGO
```

#### Volunteer Dashboard

```
Fetch Opportunities    → GET /api/requests?type=volunteer
Accept Opportunity     → POST /api/requests/:id/accept
```

#### Company Dashboard

```
Fetch Funding Requests → GET /api/requests?type=funding
Donate to NGO          → POST /api/donate
Donation History       → GET /api/donate?companyName=ABC Corp
```

---

## 🛠️ Development Workflow

### Terminal 1: Backend

```bash
cd backend
npm run dev
# Outputs: 🚀 Server running on http://localhost:5000
```

### Terminal 2: Frontend

```bash
npm run dev
# Outputs: ➜  Local: http://localhost:5173
```

### Making Changes

- **Frontend:** Changes hot-reload automatically (Vite)
- **Backend:** Changes hot-reload with nodemon
- Check console for errors in both terminals

---

## 📊 API Response Examples

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

**Response:**

```json
{
  "success": true,
  "message": "Volunteer request created successfully!",
  "data": {
    "_id": "64a5f2c1...",
    "title": "Community Teaching",
    "type": "volunteer",
    "ngoName": "Helping Hands NGO",
    "volunteersJoined": 0,
    "status": "open",
    "createdAt": "2024-04-28T...",
    "updatedAt": "2024-04-28T..."
  }
}
```

### Fetch Volunteer Requests

```bash
curl http://localhost:5000/api/requests?type=volunteer
```

**Response:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "64a5f2c1...",
      "title": "Community Teaching",
      "type": "volunteer",
      "ngoName": "Helping Hands NGO",
      "volunteersJoined": 2,
      "status": "open"
    },
    ...
  ]
}
```

### Donate

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

**Response:**

```json
{
  "success": true,
  "message": "Donation of ₹100,000 from ABC Corp received successfully!",
  "data": {
    "_id": "64a5f2c1...",
    "companyName": "ABC Corp",
    "ngoName": "Helping Hands NGO",
    "amount": 100000,
    "paymentMethod": "credit_card",
    "status": "completed",
    "createdAt": "2024-04-28T..."
  }
}
```

---

## 🎨 UI Features

### Royal Premium Theme

- **Primary Color:** Deep Navy Blue (#05122f)
- **Accent Color:** Royal Purple (#8b5cf6) & Gold (#fbbf24)
- **Typography:** Bold, uppercase labels with wide letter spacing
- **Components:** Rounded corners, soft shadows, glass-morphism effects

### Loading States

- Loading spinners during API calls
- Disabled buttons during submission
- Success/error toast messages

### Responsive Design

- Mobile: Single column layouts
- Tablet: 2-column grids
- Desktop: 3-4 column grids
- Breakpoints: sm, md, lg

---

## ✅ Testing Checklist

### NGO Dashboard

- [ ] Create volunteer request - success message appears
- [ ] Create funding request - appears in active requests
- [ ] View donations received - donations from donations table display
- [ ] Request type toggle - switches between volunteer/funding fields

### Volunteer Dashboard

- [ ] Load page - opportunities fetch from API
- [ ] Refresh button - fetches latest opportunities
- [ ] Accept opportunity - volunteer count increases
- [ ] Accept button - changes to "✓ Accepted" and disables

### Company Dashboard

- [ ] Load page - funding requests display
- [ ] Open donation modal - step indicator shows
- [ ] Select amount - custom or preset amounts
- [ ] Multi-step form - navigates between steps
- [ ] Confirm donation - success message, history updates

### General

- [ ] Error handling - network errors show messages
- [ ] CORS works - no blocking errors in console
- [ ] MongoDB connection - check backend console
- [ ] Data persists - refresh page, data still there

---

## 🐛 Troubleshooting

### CORS Error in Console

```
Access to XMLHttpRequest blocked by CORS policy
```

**Check:**

1. Backend is running on port 5000
2. `API_BASE_URL` is correct in frontend files
3. No typos in API routes

### MongoDB Connection Failed

```
MongoDB connection error: connect ECONNREFUSED
```

**Check:**

1. MongoDB is running: `brew services list` (macOS)
2. `.env` MONGODB_URI is correct
3. Connection string format is valid

### Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution:**

```bash
# Find process on port 5000
lsof -i :5000

# Kill it (macOS/Linux)
kill -9 <PID>

# Or change PORT in .env
```

### Changes Not Reflecting

- **Frontend:** Hard refresh browser (Ctrl+Shift+R)
- **Backend:** Check if nodemon reloaded (look for restart message)
- **API:** Use Postman to test endpoint directly

---

## 📈 Performance Tips

1. **Database Indexing:**

   ```javascript
   // Mongoose automatically indexes _id
   // Add custom indexes if needed in models
   ```

2. **Frontend Optimization:**
   - Use React.memo for expensive components
   - Lazy load pages with React.lazy()
   - Minimize re-renders with useCallback

3. **Backend Optimization:**
   - Add pagination to GET endpoints
   - Cache frequently accessed data
   - Use database indexing on filter fields

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
# Build
npm run build

# Deploy using Vercel CLI
vercel deploy

# Or Netlify
netlify deploy --prod
```

### Backend (Heroku/Railway)

```bash
# Set environment variables on hosting platform
# Deploy code
git push heroku main

# Or Railway
railway up
```

### Update API URL in Frontend

When deploying, update API_BASE_URL in frontend files:

```javascript
const API_BASE_URL = "https://your-backend-url.com/api";
```

---

## 📚 Additional Resources

- [Express.js Guide](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [React Hooks](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Guide](https://vitejs.dev/)

---

## 📝 Notes

- **No Authentication Yet:** Users are hardcoded by role
- **Dummy Payments:** No real payment processing
- **Mock Location:** Location filtering not implemented
- **Future Features:** Will add real auth, payments, geolocation, etc.

---

## ❓ FAQ

**Q: Can I use MongoDB Atlas instead of local MongoDB?**
A: Yes! Update `MONGODB_URI` in `.env` with your Atlas connection string.

**Q: How do I add a new user role?**
A: Edit `AuthContext.jsx` to add new role, then create corresponding dashboard page.

**Q: How do I modify the royal theme colors?**
A: Update Tailwind color values in component classes and `tailwind.config.js`.

**Q: Can I run both frontend and backend in one command?**
A: Yes, use `npm run dev:all` (if configured) or run both in separate terminals.

---

**Happy Coding! 🎉**
