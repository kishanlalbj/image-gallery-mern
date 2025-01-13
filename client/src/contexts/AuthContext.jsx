import { createContext, useState } from "react";

export const AuthContext = createContext({
  accessToken: null,
  user: null,
  setUser: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ accessToken: null, user: null });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
