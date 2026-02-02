import { createContext, useContext, useState } from "react";

/*
  This creates a context object.
  Think of it as an empty box for auth data.
*/
const AuthContext = createContext(null);

/*
  AuthProvider will wrap our entire app
  and provide auth data to all components.
*/
export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [userRole, setUserRole] = useState(
    localStorage.getItem("role")
  );

  const isLoggedIn = !!token;

  // login function (called after successful backend login)
  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setToken(token);
    setUserRole(role);
  };

  // logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userRole,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
  Custom hook to use auth context easily
*/
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
