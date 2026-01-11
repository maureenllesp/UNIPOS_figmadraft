import React, { createContext, useContext, useState } from 'react';
import { User, AuthContextType, UserRole } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, { password: string; user: User }> = {
  'cashier@unipos.com': {
    password: 'cashier123',
    user: {
      id: '1',
      name: 'Ashley Graham',
      email: 'cashier@unipos.com',
      role: 'cashier',
      active: true,
      createdAt: new Date('2025-01-01'),
    },
  },
  'admin@unipos.com': {
    password: 'admin123',
    user: {
      id: '2',
      name: 'John Smith',
      email: 'admin@unipos.com',
      role: 'admin',
      active: true,
      createdAt: new Date('2025-01-01'),
    },
  },
  'owner@unipos.com': {
    password: 'owner123',
    user: {
      id: '3',
      name: 'Sarah Johnson',
      email: 'owner@unipos.com',
      role: 'owner',
      active: true,
      createdAt: new Date('2025-01-01'),
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    const userRecord = mockUsers[email];
    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
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
