"use client";

import { useContext, createContext, useState, useEffect } from "react";

type AuthContextType = {
  accessToken: string | null;
  isLoading: boolean;
  updateAccessToken: (token: string, persist: boolean) => void;
  clearAccessToken: () => void;
};

const ACCESS_TOKEN_STORAGE_KEY = "ap_access_token";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an Auth Provider");
  }

  return auth;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken =
      localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ||
      sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

    if (storedToken) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAccessToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const updateAccessToken = (token: string, persist: boolean) => {
    setAccessToken(token);

    if (persist) {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
    } else {
      sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
    }
  };

  const clearAccessToken = () => {
    setAccessToken(null);
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoading,
        updateAccessToken,
        clearAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
