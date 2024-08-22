import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: string;
  userAuth: boolean;
  login: (username: string) => void;
  setUserAuth: (userAuth: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const UserContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('UserContext debe usarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState('');
  const [userAuth, setUserAuth] = useState(false);

  const login = (username: string) => {
    setUser(username);
  };

  const logout = () => {
    setUser('');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, userAuth, setUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
