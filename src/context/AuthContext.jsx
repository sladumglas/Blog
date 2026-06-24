import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

function getSavedUser() {
  const savedUser = localStorage.getItem('user');

  if (!savedUser) {
    return null;
  }

  return JSON.parse(savedUser);
}

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(getSavedUser);
  const [token, setToken] = useState(localStorage.getItem('token'));

  function saveUser(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
    setUserState(userData);
  }

  function login(userData) {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));

    setToken(userData.token);
    setUserState(userData);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setToken(null);
    setUserState(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        setUser: saveUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}