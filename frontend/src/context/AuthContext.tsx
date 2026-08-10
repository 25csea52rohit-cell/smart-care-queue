import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '../types';
import { fetchApi } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password?: string) => Promise<void>;
  quickLoginAsRole: (role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const mockUsers: Record<UserRole, User> = {
  PATIENT: { id: 'patient-1', email: 'patient@hospital.org', name: 'John Doe', role: 'PATIENT', phone: '+1 (555) 234-5678' },
  RECEPTIONIST: { id: 'receptionist-1', email: 'receptionist@hospital.org', name: 'Clara Oswald', role: 'RECEPTIONIST', phone: '+1 (555) 345-6789' },
  DOCTOR: { id: 'doctor-1', email: 'doctor@hospital.org', name: 'Dr. Sarah Jenkins', role: 'DOCTOR', phone: '+1 (555) 456-7890' },
  ADMIN: { id: 'admin-1', email: 'admin@hospital.org', name: 'Chief Admin Robert Chen', role: 'ADMIN', phone: '+1 (555) 678-9012' },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUsers.PATIENT);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('medqueue_token') || 'demo-token');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadUser() {
      if (!token) return;
      try {
        const data = await fetchApi<{ user: User }>('/auth/me');
        if (data && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.warn('Backend unavailable, using client demo profile:', err);
      }
    }
    loadUser();
  }, [token]);

  const login = async (email: string, password = 'password123') => {
    try {
      const data = await fetchApi<{ token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('medqueue_token', data.token);
      setToken(data.token);
      setUser(data.user);
    } catch (e) {
      // Fallback to role matching by email
      const matched = Object.values(mockUsers).find(u => u.email === email.toLowerCase()) || mockUsers.PATIENT;
      setUser(matched);
    }
  };

  const quickLoginAsRole = async (role: UserRole) => {
    setUser(mockUsers[role]);
  };

  const logout = () => {
    localStorage.removeItem('medqueue_token');
    setToken(null);
    setUser(mockUsers.PATIENT);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, quickLoginAsRole, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
