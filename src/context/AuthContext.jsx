import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component
// This component will wrap our app and provide the user state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to "log in" a user by setting their name
  const login = (userData) => {
    setUser(userData);
  };

  // Function to "log out" a user
  const logout = () => {
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook to easily use the context
// This makes it simple to get the user info in any component
export const useAuth = () => {
  return useContext(AuthContext);
};
