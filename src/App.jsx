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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/ngo/:id" element={<NGOProfilePage />} />

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
            <Route path="/ngo-dashboard" element={<NGODashboard />} />
            <Route path="/ngo-requests" element={<NGORequests />} />
            <Route path="/ngo-volunteers" element={<NGOVolunteers />} />
            <Route path="/ngo-donations" element={<NGODonations />} />
            
            <Route path="/company-dashboard" element={<CompanyDashboard />} />
            <Route path="/impact-feed" element={<ImpactFeed />} />
            <Route path="/ngo-directory" element={<NGODirectory />} />
            <Route path="/company-donations" element={<CompanyDonations />} />

            <Route path="/feed" element={<RequestFeed />} />
            <Route path="/tasks" element={<MyTasks />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-request" element={<CreateRequest />} />
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
