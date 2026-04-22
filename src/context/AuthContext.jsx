import { createContext, useContext, useState } from 'react';
import { mockVolunteerProfile, mockNGOs, mockCompanyProfile, mockRequests } from '../data/mockData';

const AuthContext = createContext(null);

const profilesByRole = {
  volunteer: {
    ...mockVolunteerProfile,
    role: 'volunteer',
    avatar: 'AP',
  },
  ngo: {
    ...mockNGOs[0],
    role: 'ngo',
    avatar: 'HF',
  },
  company: {
    ...mockCompanyProfile,
    role: 'company',
    avatar: 'TN',
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('impact_bridge_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [requests, setRequests] = useState(mockRequests);
  const [organizations, setOrganizations] = useState([...mockNGOs, mockCompanyProfile]);
  
  // Initial seeding for demo
  const [applications, setApplications] = useState([
    {
      id: 'app-seed-1',
      requestId: 'req-1',
      requestTitle: 'Teaching Volunteers Needed in Dharavi',
      applicantId: 'vol-1',
      applicantName: 'Aarav Patel',
      applicantAvatar: 'AP',
      ngoId: 'ngo-1',
      ngoName: 'Hope Foundation',
      status: 'accepted',
      date: '2026-04-18',
    },
    {
      id: 'app-seed-2',
      requestId: 'req-2',
      requestTitle: 'Flood Relief Volunteers — Nashik',
      applicantId: 'vol-1',
      applicantName: 'Aarav Patel',
      applicantAvatar: 'AP',
      ngoId: 'ngo-3',
      ngoName: 'Sahara Relief Trust',
      status: 'submitted',
      proofFile: 'relief_report_patel.pdf',
      date: '2026-04-20',
    }
  ]);

  const [donations, setDonations] = useState([
    {
      id: 'don-seed-1',
      requestId: 'req-3',
      requestTitle: 'Urban Garden Project — Funding Required',
      ngoName: 'Green Earth Initiative',
      amount: 50000,
      donorId: 'comp-1',
      donorName: 'TechNova Solutions Pvt. Ltd.',
      date: '2026-04-10',
    }
  ]);

  const [notifications, setNotifications] = useState([]);

  const notify = (title, message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [{ id, title, message, type }, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const login = (role) => {
    const profile = profilesByRole[role] || profilesByRole.volunteer;
    setUser(profile);
    localStorage.setItem('impact_bridge_user', JSON.stringify(profile));
  };

  const register = (role, formData) => {
    const newUser = {
      ...profilesByRole[role],
      ...formData,
      role,
    };
    setUser(newUser);
    localStorage.setItem('impact_bridge_user', JSON.stringify(newUser));
    if (role === 'ngo' || role === 'company') {
      setOrganizations(prev => [...prev, newUser]);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('impact_bridge_user');
  };

  const updateUser = (data) => {
    setUser(prev => {
      const updatedUser = { ...prev, ...data };
      localStorage.setItem('impact_bridge_user', JSON.stringify(updatedUser));
      // Sync with organizations list if applicable
      if (prev?.role === 'ngo' || prev?.role === 'company') {
        setOrganizations(orgs => orgs.map(org => org.id === prev.id ? updatedUser : org));
      }
      return updatedUser;
    });
  };

  const addRequest = (newRequest) => {
    const requestWithId = {
      ...newRequest,
      id: Date.now(), // More reliable ID
      ngoId: user?.id,
      ngoName: user?.name,
      ngoLogo: user?.avatar,
      fundingRaised: 0,
      volunteersJoined: 0,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setRequests(prev => [requestWithId, ...prev]);
  };

  const applyForRequest = (request) => {
    const newApplication = {
      id: Date.now(),
      requestId: request.id,
      requestTitle: request.title,
      applicantId: user?.id,
      applicantName: user?.name,
      applicantAvatar: user?.avatar,
      ngoId: request.ngoId,
      status: 'pending',
      date: new Date().toLocaleDateString(),
    };
    setApplications(prev => [newApplication, ...prev]);
  };

  const updateApplicationStatus = (applicationId, status) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        // If accepted, increment volunteersJoined in the corresponding request
        if (status === 'accepted') {
          setRequests(reqs => reqs.map(req => 
            req.id === app.requestId ? { ...req, volunteersJoined: req.volunteersJoined + 1 } : req
          ));
        }
        return { ...app, status };
      }
      return app;
    }));
  };


  const donateToRequest = (requestId, amount) => {
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    // Update request funding
    setRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, fundingRaised: r.fundingRaised + Number(amount) } : r
    ));

    // Record donation
    const newDonation = {
      id: Date.now(),
      requestId,
      requestTitle: request.title,
      ngoName: request.ngoName,
      amount: Number(amount),
      donorId: user?.id,
      donorName: user?.name,
      date: new Date().toLocaleDateString(),
    };
    setDonations(prev => [newDonation, ...prev]);
  };

  const submitWork = (applicationId, proofFile, proofPreview) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: 'submitted', proofFile, proofPreview } : app
    ));
  };

  const verifyWork = (applicationId, decision) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: decision === 'approve' ? 'completed' : 'accepted' } : app
    ));
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
      updateUser, 
      isAuthenticated,
      requests,
      organizations,
      applications,
      donations,
      notifications,
      notify,
      addRequest,
      applyForRequest,
      updateApplicationStatus,
      donateToRequest,
      submitWork, 
      verifyWork 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
