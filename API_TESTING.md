# API Testing Guide

Complete examples for testing the Smart Resource Allocation API endpoints using curl, Postman, or any HTTP client.

---

## 🔗 Base URL

```
http://localhost:5000/api
```

---

## 📋 Health Check

### Request

```bash
curl http://localhost:5000/api/health
```

### Response (200 OK)

```json
{
  "status": "Server is running ✅",
  "timestamp": "2024-04-28T10:30:00.000Z"
}
```

---

## 📝 Requests - Volunteer & Funding

### 1. Create Volunteer Request

#### Request

```bash
curl -X POST http://localhost:5000/api/requests \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Community Food Distribution",
    "description": "Help distribute food to underprivileged families in the community",
    "type": "volunteer",
    "ngoName": "Helping Hands NGO",
    "location": "Mumbai, Maharashtra",
    "skillsRequired": "Organization"
  }'
```

#### Response (201 Created)

```json
{
  "success": true,
  "message": "Volunteer request created successfully!",
  "data": {
    "_id": "64a5f2c1e8d9b2a3c4d5e6f7",
    "title": "Community Food Distribution",
    "description": "Help distribute food to underprivileged families in the community",
    "type": "volunteer",
    "ngoName": "Helping Hands NGO",
    "location": "Mumbai, Maharashtra",
    "skillsRequired": "Organization",
    "amountNeeded": 0,
    "volunteersJoined": 0,
    "status": "open",
    "createdAt": "2024-04-28T10:30:00.000Z",
    "updatedAt": "2024-04-28T10:30:00.000Z"
  }
}
```

---

### 2. Create Funding Request

#### Request

```bash
curl -X POST http://localhost:5000/api/requests \
  -H "Content-Type: application/json" \
  -d '{
    "title": "School Infrastructure Project",
    "description": "Build new classrooms and library for rural school",
    "type": "funding",
    "ngoName": "Helping Hands NGO",
    "location": "Pune, Maharashtra",
    "amountNeeded": 500000
  }'
```

#### Response (201 Created)

```json
{
  "success": true,
  "message": "Funding request created successfully!",
  "data": {
    "_id": "64a5f2c1e8d9b2a3c4d5e6f8",
    "title": "School Infrastructure Project",
    "description": "Build new classrooms and library for rural school",
    "type": "funding",
    "ngoName": "Helping Hands NGO",
    "location": "Pune, Maharashtra",
    "skillsRequired": "Any",
    "amountNeeded": 500000,
    "volunteersJoined": 0,
    "status": "open",
    "createdAt": "2024-04-28T10:31:00.000Z",
    "updatedAt": "2024-04-28T10:31:00.000Z"
  }
}
```

---

### 3. Get All Requests

#### Request

```bash
curl http://localhost:5000/api/requests
```

#### Response (200 OK)

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64a5f2c1e8d9b2a3c4d5e6f7",
      "title": "Community Food Distribution",
      "type": "volunteer",
      ...
    },
    {
      "_id": "64a5f2c1e8d9b2a3c4d5e6f8",
      "title": "School Infrastructure Project",
      "type": "funding",
      ...
    }
  ]
}
```

---

### 4. Get Volunteer Requests Only

#### Request

```bash
curl http://localhost:5000/api/requests?type=volunteer
```

#### Response (200 OK)

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "64a5f2c1e8d9b2a3c4d5e6f7",
      "title": "Community Food Distribution",
      "type": "volunteer",
      "volunteersJoined": 0,
      ...
    }
  ]
}
```

---

### 5. Get Funding Requests Only

#### Request

```bash
curl http://localhost:5000/api/requests?type=funding
```

#### Response (200 OK)

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "64a5f2c1e8d9b2a3c4d5e6f8",
      "title": "School Infrastructure Project",
      "type": "funding",
      "amountNeeded": 500000,
      ...
    }
  ]
}
```

---

### 6. Get Single Request by ID

#### Request

```bash
curl http://localhost:5000/api/requests/64a5f2c1e8d9b2a3c4d5e6f7
```

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "_id": "64a5f2c1e8d9b2a3c4d5e6f7",
    "title": "Community Food Distribution",
    ...
  }
}
```

---

### 7. Volunteer Accepts Request

#### Request

```bash
curl -X POST http://localhost:5000/api/requests/64a5f2c1e8d9b2a3c4d5e6f7/accept \
  -H "Content-Type: application/json"
```

#### Response (200 OK)

```json
{
  "success": true,
  "message": "You have successfully joined this initiative!",
  "data": {
    "_id": "64a5f2c1e8d9b2a3c4d5e6f7",
    "title": "Community Food Distribution",
    "volunteersJoined": 1,
    ...
  }
}
```

---

### 8. Close Request (NGO)

#### Request

```bash
curl -X POST http://localhost:5000/api/requests/64a5f2c1e8d9b2a3c4d5e6f7/close \
  -H "Content-Type: application/json"
```

#### Response (200 OK)

```json
{
  "success": true,
  "message": "Request closed successfully",
  "data": {
    "_id": "64a5f2c1e8d9b2a3c4d5e6f7",
    "status": "closed",
    ...
  }
}
```

---

## 💰 Donations

### 1. Create Donation

#### Request

```bash
curl -X POST http://localhost:5000/api/donate \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "ABC Corp",
    "ngoName": "Helping Hands NGO",
    "amount": 100000,
    "requestId": "64a5f2c1e8d9b2a3c4d5e6f8",
    "paymentMethod": "credit_card"
  }'
```

#### Response (201 Created)

```json
{
  "success": true,
  "message": "Donation of ₹100,000 from ABC Corp received successfully!",
  "data": {
    "_id": "64a5f2c1e8d9b2a3c4d5e6f9",
    "companyName": "ABC Corp",
    "ngoName": "Helping Hands NGO",
    "amount": 100000,
    "requestId": "64a5f2c1e8d9b2a3c4d5e6f8",
    "paymentMethod": "credit_card",
    "status": "completed",
    "createdAt": "2024-04-28T10:32:00.000Z",
    "updatedAt": "2024-04-28T10:32:00.000Z"
  }
}
```

---

### 2. Get All Donations

#### Request

```bash
curl http://localhost:5000/api/donate
```

#### Response (200 OK)

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "64a5f2c1e8d9b2a3c4d5e6f9",
      "companyName": "ABC Corp",
      "ngoName": "Helping Hands NGO",
      "amount": 100000,
      ...
    }
  ]
}
```

---

### 3. Get Donations by NGO

#### Request

```bash
curl "http://localhost:5000/api/donate?ngoName=Helping%20Hands%20NGO"
```

#### Response (200 OK)

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "64a5f2c1e8d9b2a3c4d5e6f9",
      "ngoName": "Helping Hands NGO",
      "amount": 100000,
      ...
    }
  ]
}
```

---

### 4. Get Donations by Company

#### Request

```bash
curl "http://localhost:5000/api/donate?companyName=ABC%20Corp"
```

#### Response (200 OK)

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "64a5f2c1e8d9b2a3c4d5e6f9",
      "companyName": "ABC Corp",
      "amount": 100000,
      ...
    }
  ]
}
```

---

### 5. Get Donation Statistics

#### Request

```bash
curl http://localhost:5000/api/donate/stats/Helping%20Hands%20NGO
```

#### Response (200 OK)

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

---

## ❌ Error Responses

### 400 Bad Request - Missing Required Field

#### Request

```bash
curl -X POST http://localhost:5000/api/requests \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Community Food Distribution"
  }'
```

#### Response (400 Bad Request)

```json
{
  "error": "Missing required fields"
}
```

---

### 404 Not Found - Request ID Invalid

#### Request

```bash
curl http://localhost:5000/api/requests/invalid-id
```

#### Response (404 Not Found)

```json
{
  "error": "Request not found"
}
```

---

### 500 Internal Server Error - Database Issue

#### Response (500 Internal Server Error)

```json
{
  "error": "Failed to create request",
  "details": "Database connection error"
}
```

---

## 🧪 Postman Collection

### How to Import

1. Open Postman
2. Click "Import"
3. Paste this JSON or save as file

```json
{
  "info": {
    "name": "Smart Resource Allocation API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:5000/api/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "health"]
        }
      }
    },
    {
      "name": "Create Volunteer Request",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\"title\":\"Community Teaching\",\"description\":\"Help teach kids\",\"type\":\"volunteer\",\"ngoName\":\"Helping Hands NGO\",\"location\":\"Mumbai\",\"skillsRequired\":\"Teaching\"}"
        },
        "url": {
          "raw": "http://localhost:5000/api/requests",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "requests"]
        }
      }
    }
  ]
}
```

---

## 🔑 Query Parameters Cheat Sheet

| Endpoint                       | Parameter   | Example                    |
| ------------------------------ | ----------- | -------------------------- |
| GET /api/requests              | type        | ?type=volunteer            |
| GET /api/requests              | type        | ?type=funding              |
| GET /api/donate                | ngoName     | ?ngoName=Helping Hands NGO |
| GET /api/donate                | companyName | ?companyName=ABC Corp      |
| GET /api/donate/stats/:ngoName | -           | /stats/Helping Hands NGO   |

---

## 📊 Sample Test Flow

```bash
# 1. Check server is running
curl http://localhost:5000/api/health

# 2. Create volunteer request
VOLUNTEER_ID=$(curl -s -X POST http://localhost:5000/api/requests \
  -H "Content-Type: application/json" \
  -d '{"title":"Community Teaching","description":"Teaching","type":"volunteer","ngoName":"Helping Hands NGO","location":"Mumbai","skillsRequired":"Teaching"}' \
  | jq -r '.data._id')

# 3. Accept the request
curl -X POST http://localhost:5000/api/requests/$VOLUNTEER_ID/accept

# 4. Create funding request
FUNDING_ID=$(curl -s -X POST http://localhost:5000/api/requests \
  -H "Content-Type: application/json" \
  -d '{"title":"School Project","description":"Building","type":"funding","ngoName":"Helping Hands NGO","location":"Pune","amountNeeded":500000}' \
  | jq -r '.data._id')

# 5. Donate for funding request
curl -X POST http://localhost:5000/api/donate \
  -H "Content-Type: application/json" \
  -d "{\"companyName\":\"ABC Corp\",\"ngoName\":\"Helping Hands NGO\",\"amount\":100000,\"requestId\":\"$FUNDING_ID\",\"paymentMethod\":\"credit_card\"}"

# 6. Get all requests
curl http://localhost:5000/api/requests

# 7. Get donations stats
curl http://localhost:5000/api/donate/stats/Helping%20Hands%20NGO
```

---

## 💡 Tips

1. **Use jq for JSON formatting:**

   ```bash
   curl http://localhost:5000/api/requests | jq '.'
   ```

2. **Extract ID from response:**

   ```bash
   curl -s http://localhost:5000/api/requests | jq '.data[0]._id'
   ```

3. **Pretty print JSON:**

   ```bash
   curl http://localhost:5000/api/requests | jq '.data | length'
   ```

4. **Use environment variables:**
   ```bash
   API_URL="http://localhost:5000/api"
   curl $API_URL/health
   ```

---

**Happy Testing! 🚀**
