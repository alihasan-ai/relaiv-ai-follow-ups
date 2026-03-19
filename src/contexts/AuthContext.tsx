import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  business_name: string;
  business_type: string;
  plan: string;
  status: string;
  avatar_url: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => void;
  refreshProfile: () => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) setProfile(data as Profile);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          // Defer profile fetch to avoid blocking
          setTimeout(() => fetchProfile(session.user.id), 0);
        } else {
          setUser(null);
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    // Check admin from localStorage (admin is separate)
    const adminStored = localStorage.getItem('relaiv_admin');
    if (adminStored) setIsAdmin(true);

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signup = async (data: SignupData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
          business_name: data.business_name,
          business_type: data.business_type,
        },
      },
    });
    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
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
    <AuthContext.Provider value={{ user, profile, isLoading, login, signup, logout, isAdmin, adminLogin, adminLogout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
