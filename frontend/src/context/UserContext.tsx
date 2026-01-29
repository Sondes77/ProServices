// src/context/UserContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { User } from '../utils/types';
import { user as defaultUser } from '../utils/mock-data';

interface UserContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
