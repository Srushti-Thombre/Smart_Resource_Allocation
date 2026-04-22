import { createContext, useContext, useState } from 'react';
import { mockVolunteerProfile, mockNGOs, mockCompanyProfile } from '../data/mockData';

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
  const [user, setUser] = useState(null);

  const login = (role) => {
    setUser(profilesByRole[role] || profilesByRole.volunteer);
  };

  const register = (role, formData) => {
    setUser({
      ...profilesByRole[role],
      ...formData,
      role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (data) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isAuthenticated }}>
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
