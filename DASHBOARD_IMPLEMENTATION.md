# Smart Resource Allocation - Dashboard Implementation

## Overview

A modern, scalable React + Tailwind CSS + Vite web application with a royal premium theme featuring three role-based dashboards: NGO, Volunteer, and Company.

**Theme Colors:**

- Deep Navy Blue: `#05122f`, `#0f172a`
- Royal Purple: `#8b5cf6`, `#7c3aed`
- Gold/Amber Accents: `#fbbf24`, `#f59e0b`
- Rounded Corners: `2xl` to `3xl`
- Soft Shadows with blur effects

---

## 📂 Folder Structure

```
src/
├── components/
│   ├── Sidebar.jsx          (Dynamic menu based on role)
│   ├── Navbar.jsx           (Top navigation bar)
│   ├── DashboardLayout.jsx  (Reusable layout wrapper)
│   ├── StatsCard.jsx        (Stats display component)
│   └── ...other components
├── pages/
│   ├── NGODashboard.jsx                (NGO Dashboard)
│   ├── VolunteerDashboard.jsx          (Volunteer Dashboard)
│   ├── CompanyDashboard.jsx            (Company Dashboard)
│   └── ...other pages
├── layouts/
│   └── DashboardLayout.jsx   (Main dashboard wrapper)
├── context/
│   └── AuthContext.jsx       (User authentication context)
└── App.jsx                   (Router configuration)
```

---

## 🛣️ Routes

| Route                  | Component          | Role      |
| ---------------------- | ------------------ | --------- |
| `/ngo-dashboard`       | NGODashboard       | NGO       |
| `/volunteer-dashboard` | VolunteerDashboard | Volunteer |
| `/company-dashboard`   | CompanyDashboard   | Company   |

All dashboard routes are wrapped with `DashboardLayout` and `ProtectedRoute`.

---

## 🎨 Royal Premium Design System

### Color Palette

- **Primary**: Navy Blue (`#05122f`)
- **Secondary**: Purple (`#8b5cf6`)
- **Accent**: Gold (`#fbbf24`)
- **Background**: Gradient navy → purple
- **Text**: Light slate/white

### Components

- **Cards**: Rounded borders (`rounded-2xl`, `rounded-3xl`), white/5-10% overlay backgrounds
- **Buttons**: Gradient overlays, gold accents, smooth hover animations
- **Inputs**: Transparent with subtle borders, focus states with gold underline
- **Shadows**: Soft shadows with colored glows (amber-500/10, purple-500/10, etc.)
- **Hover Effects**: Scale, lift, border color change, background opacity increase

---

## 📊 1. NGO Dashboard (`/ngo-dashboard`)

### Sections:

#### Welcome Card

- Greeting: "Welcome back, [NGO Name]!"
- Description of organization's mission
- Team size and location info

#### Stats Cards

- Volunteers Engaged (with trend)
- Total Funds Raised (with trend)
- Active Requests (count)

#### About Organization

- Description text
- Two-column layout with image placeholder
- CTA to post new requests

#### Post New Request Modal

- Title field
- Description textarea
- Location input
- Urgency dropdown (Low/Medium/High)
- Required Skills input
- Submit/Cancel buttons

#### Active Requests Section

- 3-column grid of request cards
- Each card shows:
  - Title
  - Location
  - Volunteers Joined (count)
  - Status (Open/Closed)
  - View Details link

#### Donations Received

- Summary stats: Total Raised, Total Donors, Average Donation
- Donation history table:
  - Donor Name
  - Amount (INR)
  - Date
  - Detailed breakdown

---

## 🤝 2. Volunteer Dashboard (`/volunteer-dashboard`)

### Sections:

#### Welcome Card

- Greeting: "Hello, [Name]! Ready to make an impact?"
- Motivational message

#### Stats Cards

- Tasks Completed
- Hours Contributed (with trend)
- Certificates Earned
- New Goal (dashed button)

#### Nearby Opportunities

- 6-card grid showing volunteer opportunities
- Each card displays:
  - Title
  - NGO Name (in amber)
  - Location with icon
  - Skill Required
  - Number of volunteers joined
  - "Accept Opportunity" button

#### Map Placeholder

- Full-width section with map image placeholder
- Shows nearby NGO requests with pins

#### My Contributions

- List view of completed/scheduled tasks
- Shows:
  - Task title
  - NGO name
  - Date completed
  - Hours contributed
  - Status badge (Completed/Scheduled)

#### Certificates & Awards

- 3-column grid of certificate cards
- Each shows:
  - Certificate image placeholder (🏅)
  - Certificate name
  - Date earned
  - Download button

#### Pro Tip Section

- Gradient background card
- Tips about updating profile with skills
- Link to profile update page

---

## 🏢 3. Company Dashboard (`/company-dashboard`)

### Sections:

#### Welcome Card

- Message: "Make a Meaningful Impact Through Your Contributions"
- Description of CSR contribution value

#### Stats Cards

- Total Donated (with trend)
- NGOs Supported (count)
- Tax Receipts (count)
- Impact Score (0-10)

#### Funding Requests

- 2-column grid of NGO funding opportunities
- Each card shows:
  - NGO Name
  - Purpose/Initiative description
  - Funding progress bar (visual %)
  - Amount Raised / Amount Needed
  - Number of beneficiaries
  - "Donate Now" button

#### Donation Modal (Multi-step)

- **Step 1 - Amount**
  - Initiative name display
  - Amount input field
  - Quick-select buttons (₹50k, ₹100k, ₹500k)
  - Tax benefit info banner
  - Cancel/Continue buttons

- **Step 2 - Payment Method**
  - Radio selection of payment methods:
    - Corporate Credit Card
    - Bank Transfer (NEFT)
    - CSR Wallet
  - Pay button with amount display

- **Step 3 - Success**
  - Success checkmark animation
  - Confirmation message
  - Receipt details
  - Return to dashboard button

#### Donation Summary

- Total Contributed (in Lakhs)
- Causes Supported (count)
- Recent donations list with:
  - NGO Name
  - Purpose/Cause
  - Amount
  - Date
  - View receipt link

#### Reports Section

- Chart/Analytics placeholder
- Download Report button
- Visual placeholder with 📊 icon

---

## 🧩 DashboardLayout Component

Provides consistent layout across all dashboards:

### Features:

- **Sidebar** (Fixed left, 256px width)
  - Logo + Organization name
  - Dynamic menu based on user role
  - Active route highlighting (amber/200)
  - Profile settings link
  - Logout button

- **Top Navbar** (Sticky, full width)
  - Search bar (appears on specific routes)
  - Notification bell with badge
  - User profile section:
    - Avatar (circle with gradient)
    - User name (bold white)
    - Role (uppercase, amber)
  - Mobile hamburger menu

- **Main Content Area**
  - Responsive padding
  - Outlet for nested routes

---

## 📱 Responsive Design

- **Mobile** (`< 640px`): Single column, collapsed sidebar, hidden search
- **Tablet** (`640px - 1024px`): 2-column layouts, sidebar visible
- **Desktop** (`> 1024px`): 3+ column grids, full sidebar

Grid breakpoints used:

- `sm:` for 640px+
- `md:` for 768px+
- `lg:` for 1024px+

---

## 🎯 Key Features

### Mock Data

All pages use **mock/dummy data** - no backend API calls:

- NGO Dashboard: 3 sample requests, 4 donation entries
- Volunteer Dashboard: 6 opportunity cards, 3 contribution entries, 3 certificates
- Company Dashboard: 4 funding opportunities, 4 donation history entries

### Interactive Elements

- **Modal Dialogs**: Form submissions and donation flows
- **Form Validation**: Basic validation on input fields
- **Hover Effects**: Card lift, opacity changes, color transitions
- **Buttons**: Gradient backgrounds, shadow effects, disabled states

### Accessibility

- Semantic HTML structure
- ARIA labels on icons
- Keyboard-friendly navigation
- Proper contrast ratios (amber on dark backgrounds)

---

## 🚀 Getting Started

### Prerequisites

- React 18.2.0+
- React Router v7
- Tailwind CSS 3.4.4+
- React Icons 5.6.0+

### Installation

```bash
cd Smart_Resource_Allocation
npm install
npm run dev
```

### Environment Setup

The app uses React Router for navigation. Make sure the `AuthContext` provides:

- `user`: Object with `name` and `role` properties
- `isAuthenticated`: Boolean flag

---

## 🔧 Customization Guide

### Change Theme Colors

Edit the Tailwind CSS classes in each component:

- Replace `from-purple-600/20` with your gradient start color
- Replace `from-amber-400 to-amber-500` with your accent gradient
- Update `text-slate-300` for text colors

### Add More Dashboard Routes

1. Create a new page component in `/pages`
2. Add route in `App.jsx`
3. Add menu item in `Sidebar.jsx` menuItems object
4. Wrap with `ProtectedRoute` if needed

### Update Stats Data

Replace mock data objects with real API calls:

```javascript
// Before: Mock data
const stats = { value: 47, trend: "+12 this month" };

// After: API call
useEffect(() => {
  fetchStats().then(setStats);
}, []);
```

### Modify Card Layouts

Adjust grid columns:

- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` = Responsive 3-column
- `grid-cols-2` = Always 2 columns
- `grid-cols-1` = Always 1 column

---

## ✨ Design Highlights

### Premium Effects

- **Gradient Overlays**: `bg-white/5` to `bg-white/10` for depth
- **Glow Effects**: `shadow-lg shadow-amber-500/10` for accent glow
- **Blur Backdrops**: `backdrop-blur-md` for modal transparency
- **Animations**: Fade in, scale in, smooth transitions on hover

### Typography

- **Headings**: Bold white text, varied sizes (text-xl to text-3xl)
- **Labels**: Uppercase, tracking-widest, smaller font (text-xs)
- **Body**: Slate-300/400, readable line-height (leading-relaxed)

### Spacing

- **Padding**: 6-8px cards, 16-24px sections
- **Gaps**: 4-6px between elements, 16-24px between sections
- **Margins**: Top margin for hierarchy (mt-2 to mt-10)

---

## 📝 Notes

- **No Authentication Logic**: All protections are UI-based
- **No API Integration**: All data is mock/hardcoded
- **No Database**: User data persists only in client-side context
- **Development Focus**: UI/UX and structure implementation only

---

## 🎓 Best Practices Applied

✅ Component-based architecture  
✅ Reusable layout wrapper  
✅ Role-based menu rendering  
✅ Tailwind CSS utility-first approach  
✅ Semantic HTML with proper structure  
✅ Accessible color contrasts  
✅ Responsive mobile-first design  
✅ Clean file organization  
✅ Consistent naming conventions  
✅ DRY principle (Don't Repeat Yourself)

---

## Future Enhancements

When ready to make this production-ready:

1. Replace mock data with API calls
2. Implement proper authentication with JWT
3. Add form validation library (react-hook-form)
4. Add state management (Redux/Zustand)
5. Implement error boundaries
6. Add loading skeletons
7. Setup real database (PostgreSQL, MongoDB)
8. Add analytics tracking
9. Implement push notifications
10. Add dark/light theme toggle

---

**Last Updated**: April 28, 2026  
**Status**: Complete UI Implementation ✅
