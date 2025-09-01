import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on app load
    const token = localStorage.getItem('dcode_token');
    const userData = localStorage.getItem('dcode_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('dcode_token');
        localStorage.removeItem('dcode_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call - replace with actual API integration
    const mockUsers = [
      { id: '1', name: 'John Student', email: 'student@example.com', role: 'student' as const },
      { id: '2', name: 'Jane Instructor', email: 'instructor@example.com', role: 'instructor' as const },
      { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' as const },
    ];

    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      const token = 'mock-jwt-token';
      localStorage.setItem('dcode_token', token);
      localStorage.setItem('dcode_user', JSON.stringify(foundUser));
      setUser(foundUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call - replace with actual API integration
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'student',
    };

    const token = 'mock-jwt-token';
    localStorage.setItem('dcode_token', token);
    localStorage.setItem('dcode_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('dcode_token');
    localStorage.removeItem('dcode_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}