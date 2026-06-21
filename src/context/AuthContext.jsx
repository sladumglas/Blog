import { createContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../api/authApi.js';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        return;
      }

      try {
        setIsAuthLoading(true);

        const data = await getCurrentUser(token);

        setUser(data.user);
      } catch {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    }

    loadUser();
  }, [token]);

  function login(userData) {
    localStorage.setItem('token', userData.token);
    setToken(userData.token);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthLoading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}