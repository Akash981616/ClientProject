import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      setUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setIsAuthenticated(true);
    setUser(user);
    return user;
  };

  const logout = async () => {
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, loading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
