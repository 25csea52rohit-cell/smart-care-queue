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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('medqueue_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await fetchApi<{ user: User }>('/auth/me');
        setUser(data.user);
      } catch (err) {
        console.error('Failed to authenticate token:', err);
        localStorage.removeItem('medqueue_token');
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, [token]);

  const login = async (email: string, password = 'password123') => {
    const data = await fetchApi<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem('medqueue_token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const quickLoginAsRole = async (role: UserRole) => {
    const roleEmails: Record<UserRole, string> = {
      PATIENT: 'patient@hospital.org',
      RECEPTIONIST: 'receptionist@hospital.org',
      DOCTOR: 'doctor@hospital.org',
      ADMIN: 'admin@hospital.org',
    };
    await login(roleEmails[role], 'password123');
  };

  const logout = () => {
    localStorage.removeItem('medqueue_token');
    setToken(null);
    setUser(null);
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
