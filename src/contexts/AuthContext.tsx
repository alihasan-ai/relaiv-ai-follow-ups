import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  business_name: string;
  business_type: string;
  plan: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => void;
}

interface SignupData {
  email: string;
  password: string;
  full_name: string;
  business_name: string;
  business_type: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const stored = localStorage.getItem('relaiv_user');
    const adminStored = localStorage.getItem('relaiv_admin');
    if (stored) setUser(JSON.parse(stored));
    if (adminStored) setIsAdmin(true);
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    // Mock login
    const mockUser: AuthUser = {
      id: '1',
      email,
      full_name: 'Demo User',
      business_name: 'Demo Business',
      business_type: 'Coaching',
      plan: 'growth',
    };
    setUser(mockUser);
    localStorage.setItem('relaiv_user', JSON.stringify(mockUser));
  };

  const signup = async (data: SignupData) => {
    const mockUser: AuthUser = {
      id: '1',
      email: data.email,
      full_name: data.full_name,
      business_name: data.business_name,
      business_type: data.business_type,
      plan: 'starter',
    };
    setUser(mockUser);
    localStorage.setItem('relaiv_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('relaiv_user');
  };

  const adminLogin = async (email: string, _password: string) => {
    if (email === 'admin@relaiv.com') {
      setIsAdmin(true);
      localStorage.setItem('relaiv_admin', 'true');
    } else {
      throw new Error('Invalid admin credentials');
    }
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('relaiv_admin');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, isAdmin, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
