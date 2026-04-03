'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// This is a mock user type for the client-side implementation
interface MockUser {
  email: string;
  role: 'architect' | 'admin' | 'contractor';
}

// This is a mock database user type
interface MockDbUser extends MockUser {
  password?: string; // In a real app, never store plain text passwords
}

interface AuthContextType {
  user: MockUser | null;
  signup: (email: string, password: string, role: 'architect' | 'contractor') => Promise<boolean>;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultAdmin: MockDbUser = {
  email: 'saalim@gmail.com',
  password: '123',
  role: 'admin',
};

// Helper to interact with our mock user database in localStorage
const getMockUsers = (): MockDbUser[] => {
  if (typeof window === 'undefined') return [];
  try {
    const usersJSON = localStorage.getItem('mock_users');
    if (!usersJSON) {
      // If no users exist, seed with the default admin
      setMockUsers([defaultAdmin]);
      return [defaultAdmin];
    }
    const users = JSON.parse(usersJSON);
    // Ensure the default admin is always present
    if (!users.find((u: MockDbUser) => u.email === defaultAdmin.email)) {
      const updatedUsers = [...users, defaultAdmin];
      setMockUsers(updatedUsers);
      return updatedUsers;
    }
    return users;
  } catch (e) {
    // If there's an error parsing, reset with the default admin
    setMockUsers([defaultAdmin]);
    return [defaultAdmin];
  }
};

const setMockUsers = (users: MockDbUser[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mock_users', JSON.stringify(users));
};


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Ensure mock users are initialized on load
    getMockUsers();
    
    // Check for user in localStorage on initial load
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
    }
    setIsLoading(false);
  }, []);

  const signup = async (email: string, password: string, role: 'architect' | 'contractor'): Promise<boolean> => {
    if (typeof window === 'undefined') return false;
    const users = getMockUsers();
    if (users.find(u => u.email === email)) {
      return false; // User already exists
    }
    users.push({ email, password, role });
    setMockUsers(users);
    return true;
  };

  const login = async (email: string, password?: string): Promise<boolean> => {
    if (typeof window === 'undefined') return false;
    const users = getMockUsers();
    // Check for both email and password
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userData = { email: foundUser.email, role: foundUser.role };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      if (userData.role === 'admin' || userData.role === 'architect' || userData.role === 'contractor') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const value = { user, login, logout, signup, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
