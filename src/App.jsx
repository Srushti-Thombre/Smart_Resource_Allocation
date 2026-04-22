import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VolunteerDashboard from './pages/VolunteerDashboard';
import NGODashboard from './pages/NGODashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import RequestFeed from './pages/RequestFeed';
import MyTasks from './pages/MyTasks';
import Certificates from './pages/Certificates';
import NGOProfilePage from './pages/NGOProfilePage';
import CreateRequest from './pages/CreateRequest';
import DonationPage from './pages/DonationPage';

// NGO Pages
import NGORequests from './pages/NGORequests';
import NGOVolunteers from './pages/NGOVolunteers';
import NGODonations from './pages/NGODonations';

// Company Pages
import ImpactFeed from './pages/ImpactFeed';
import NGODirectory from './pages/NGODirectory';
import CompanyDonations from './pages/CompanyDonations';
import ProfilePage from './pages/ProfilePage';

import NotificationToast from './components/NotificationToast';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NotificationToast />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/ngo/:id" element={<NGOProfilePage />} />

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            {/* Volunteer Specific */}
            <Route path="/volunteer-dashboard" element={<ProtectedRoute allowedRoles={['volunteer']}><VolunteerDashboard /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute allowedRoles={['volunteer']}><MyTasks /></ProtectedRoute>} />
            <Route path="/certificates" element={<ProtectedRoute allowedRoles={['volunteer']}><Certificates /></ProtectedRoute>} />
            
            {/* NGO Specific */}
            <Route path="/ngo-dashboard" element={<ProtectedRoute allowedRoles={['ngo']}><NGODashboard /></ProtectedRoute>} />
            <Route path="/ngo-requests" element={<ProtectedRoute allowedRoles={['ngo']}><NGORequests /></ProtectedRoute>} />
            <Route path="/ngo-volunteers" element={<ProtectedRoute allowedRoles={['ngo']}><NGOVolunteers /></ProtectedRoute>} />
            <Route path="/ngo-donations" element={<ProtectedRoute allowedRoles={['ngo']}><NGODonations /></ProtectedRoute>} />
            <Route path="/create-request" element={<ProtectedRoute allowedRoles={['ngo']}><CreateRequest /></ProtectedRoute>} />
            
            {/* Company Specific */}
            <Route path="/company-dashboard" element={<ProtectedRoute allowedRoles={['company']}><CompanyDashboard /></ProtectedRoute>} />
            <Route path="/impact-feed" element={<ProtectedRoute allowedRoles={['company']}><ImpactFeed /></ProtectedRoute>} />
            <Route path="/ngo-directory" element={<ProtectedRoute allowedRoles={['company']}><NGODirectory /></ProtectedRoute>} />
            <Route path="/company-donations" element={<ProtectedRoute allowedRoles={['company']}><CompanyDonations /></ProtectedRoute>} />

            {/* Shared */}
            <Route path="/feed" element={<RequestFeed />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/donate" element={<DonationPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
