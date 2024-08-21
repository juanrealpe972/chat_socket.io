import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  open: boolean;
  setOpen: (state: boolean) => void;
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
  const [user, setUser] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(true);

  const login = (username: string) => {
    setUser(username);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, open, setOpen}}>
      {children}
    </AuthContext.Provider>
  );
};
