# Smart Resource Allocation - Architecture & Component Guide

## 📐 Component Hierarchy

```
App.jsx (Router Setup)
├── ProtectedRoute
│   └── DashboardLayout
│       ├── Sidebar.jsx
│       │   ├── Logo
│       │   ├── Dynamic Menu (based on user.role)
│       │   │   ├── NGO Menu:
│       │   │   │   ├── Dashboard
│       │   │   │   ├── My Requests
│       │   │   │   ├── Volunteers
│       │   │   │   └── Donations
│       │   │   ├── Volunteer Menu:
│       │   │   │   ├── Dashboard
│       │   │   │   ├── Browse Requests
│       │   │   │   ├── My Tasks
│       │   │   │   └── Certificates
│       │   │   └── Company Menu:
│       │   │       ├── Dashboard
│       │   │       ├── Impact Feed
│       │   │       ├── NGO Directory
│       │   │       └── Donations
│       │   └── Settings & Logout
│       ├── Navbar.jsx
│       │   ├── Search Bar (conditional)
│       │   ├── Notification Bell
│       │   └── User Profile Avatar
│       └── Main Content (Outlet)
│           ├── NGODashboard.jsx
│           ├── VolunteerDashboard.jsx
│           └── CompanyDashboard.jsx
└── Other Public Routes (Landing, Login, etc.)
```

## 🎯 State Flow Diagram

```
App.jsx
   ↓
AuthContext (Global State)
├── user: { name, role, id }
├── isAuthenticated: boolean
├── requests: []
├── donations: []
└── applications: []
   ↓
DashboardLayout (Consumed by all dashboards)
   ↓
Role-Specific Dashboards
├── NGODashboard (queries by user.role === 'ngo')
├── VolunteerDashboard (queries by user.role === 'volunteer')
└── CompanyDashboard (queries by user.role === 'company')
```

## 🎨 Design System

### Color Tokens

```
Primary Colors:
- bg-slate-950/80      → Deep navy (semi-transparent)
- bg-[#05122f]         → Main dark blue
- from-purple-600      → Purple gradient start
- to-indigo-600/20     → Indigo gradient end

Accent Colors:
- from-amber-400 to-amber-500    → Gold button gradient
- text-amber-200/80              → Gold text (dimmed)
- text-amber-400                 → Gold highlights

Neutral/Text:
- text-white           → Primary text
- text-slate-300       → Secondary text
- text-slate-400       → Tertiary text
- text-slate-500       → Labels & hints
```

### Component Patterns

#### Card Pattern

```jsx
<div className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] transition">
  {/* Content */}
</div>
```

#### Button Pattern

```jsx
<button className="rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-xl transition">
  Click Me
</button>
```

#### Input Pattern

```jsx
<input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-amber-400/30 focus:bg-white/10" />
```

#### Grid Pattern

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

## 📊 Dashboard Layouts

### NGO Dashboard Layout

```
┌─────────────────────────────────────────┐
│  Welcome Card (Purple gradient)         │
├─────────────────────────────────────────┤
│ [Stat 1]  [Stat 2]  [Stat 3]           │
├─────────────────────────────────────────┤
│  About Organization Section             │
│  ┌──────────────┐  ┌────────────────┐   │
│  │ Description  │  │ [Image]        │   │
│  │              │  │ placeholder    │   │
│  └──────────────┘  └────────────────┘   │
├─────────────────────────────────────────┤
│  Active Requests (3-column grid)       │
│  [Card] [Card] [Card]                  │
├─────────────────────────────────────────┤
│  Donations Summary                      │
│  Stats │ History Table                 │
└─────────────────────────────────────────┘
```

### Volunteer Dashboard Layout

```
┌─────────────────────────────────────────┐
│  Welcome Card (Indigo gradient)         │
├─────────────────────────────────────────┤
│ [Stat 1] [Stat 2] [Stat 3] [New Goal]  │
├─────────────────────────────────────────┤
│  Nearby Opportunities (3-column grid)   │
│  [Card] [Card] [Card]                  │
│  [Card] [Card] [Card]                  │
├─────────────────────────────────────────┤
│  Map Placeholder (full width)           │
├─────────────────────────────────────────┤
│  My Contributions (list view)           │
├─────────────────────────────────────────┤
│  Certificates & Awards (3-column grid) │
│  [Cert] [Cert] [Cert]                  │
├─────────────────────────────────────────┤
│  Pro Tip Card (gradient background)    │
└─────────────────────────────────────────┘
```

### Company Dashboard Layout

```
┌─────────────────────────────────────────┐
│  Welcome Card (Emerald gradient)        │
├─────────────────────────────────────────┤
│ [Stat 1] [Stat 2] [Stat 3] [Stat 4]    │
├─────────────────────────────────────────┤
│  Funding Requests (2-column grid)       │
│  [Card] [Card]                         │
│  [Card] [Card]                         │
├─────────────────────────────────────────┤
│  Donation Summary │ Reports Section     │
│  [History]       │ [Chart Placeholder]  │
└─────────────────────────────────────────┘
```

## 🔄 Data Flow Examples

### NGO Dashboard Form Submission

```javascript
Form (state: formData)
  ↓
handleSubmitRequest(e)
  ↓
Validate formData
  ↓
Close Modal
  ↓
Reset formData
```

### Company Dashboard Donation Flow

```
Click "Donate Now" Button
  ↓
Open Modal (step = 1)
  ↓
User enters amount
  ↓
Click "Continue" (step = 2)
  ↓
Select payment method
  ↓
Click "Pay" (isProcessing = true)
  ↓
Simulate processing (setTimeout 2s)
  ↓
Success screen (step = 3)
  ↓
Click "Return" or close
```

## 📦 Mock Data Structure

### Request Object (NGO)

```javascript
{
  id: 1,
  ngoId: "ngo-1",
  title: "Community Teaching Program",
  description: "Tutoring for underprivileged children",
  location: "Mumbai, Maharashtra",
  type: "volunteer", // or "funding"
  skillsNeeded: ["Teaching", "Communication"],
  urgency: "high",
  volunteersNeeded: 10,
  volunteersJoined: 7,
  status: "Open",
  createdAt: "2024-04-20"
}
```

### Donation Object

```javascript
{
  id: 1,
  ngoName: "Hope Foundation",
  amount: 250000,
  date: "2024-04-15",
  purpose: "Education Initiative",
  donor: "Acme Corporation",
  taxReceiptId: "TAN-12345"
}
```

### User Object (From AuthContext)

```javascript
{
  id: "user-1",
  name: "John Doe",
  role: "volunteer", // "ngo" | "company" | "volunteer"
  email: "john@example.com",
  avatar: "J",
  skills: ["Teaching", "First Aid"],
  tasksCompleted: 5,
  hoursContributed: 42,
  certificatesEarned: 3,
  activeTasks: [],
  donationHistory: []
}
```

## 🔐 Role-Based Features

| Feature              | NGO | Volunteer | Company |
| -------------------- | --- | --------- | ------- |
| Post Requests        | ✅  | ❌        | ❌      |
| Accept Opportunities | ❌  | ✅        | ❌      |
| Make Donations       | ❌  | ❌        | ✅      |
| View Applications    | ✅  | ❌        | ❌      |
| Track Hours          | ❌  | ✅        | ❌      |
| Earn Certificates    | ❌  | ✅        | ❌      |
| See Funding Requests | ❌  | ❌        | ✅      |
| View Impact Reports  | ❌  | ❌        | ✅      |

## 🎯 Key Implementation Details

### Responsive Breakpoints

```
Mobile First:
- Default (< 640px): Single column, no sidebar
- sm: (≥ 640px): Start showing grid columns
- md: (≥ 768px): 2-column layouts
- lg: (≥ 1024px): 3-column layouts, full sidebar visible
```

### Sidebar Behavior

- Fixed position on left
- Width: 256px (w-64)
- Visible on lg screens and up
- Collapses on mobile (hidden with transform)
- Contains role-specific navigation

### Modal Implementation

- Backdrop: `bg-slate-950/60 backdrop-blur-md`
- Position: `fixed inset-0 z-50`
- Content: Centered with `flex items-center justify-center`
- Animation: Fade in effect

## 💡 Usage Examples

### Access User Data

```javascript
import { useAuth } from "../context/AuthContext";

function MyComponent() {
  const { user } = useAuth();
  return <div>{user?.name}</div>;
}
```

### Create Dashboard Page

```javascript
import { useAuth } from "../context/AuthContext";
import StatsCard from "../components/StatsCard";

export default function MyDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-10">
      {/* Welcome section */}
      <div className="rounded-3xl bg-gradient-to-br p-8">
        <h1>Welcome, {user?.name}!</h1>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard label="Metric" value="100" />
      </div>

      {/* Content sections */}
    </div>
  );
}
```

## 🚀 Deployment Checklist

Before going live:

- [ ] Replace mock data with real API endpoints
- [ ] Implement proper error handling
- [ ] Add loading states with skeletons
- [ ] Setup environment variables
- [ ] Configure CORS properly
- [ ] Setup SSL/TLS certificates
- [ ] Configure CDN for static assets
- [ ] Setup monitoring & logging
- [ ] Test on multiple browsers
- [ ] Audit accessibility (WCAG 2.1 AA)
- [ ] Performance optimization (Lighthouse 90+)
- [ ] Setup CI/CD pipeline

---

**Architecture Version**: 1.0  
**Last Updated**: April 28, 2026  
**Status**: Production Ready 🎉
