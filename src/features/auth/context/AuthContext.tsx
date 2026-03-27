import React from "react";

import {
  AUTH_STATE_CHANGE_EVENT,
  clearStoredAuthState,
  readStoredAuthState,
  setStoredAuthState,
} from "@/features/auth/lib/authStorage";
import type { AuthUser } from "@/features/auth/types/auth";

type AuthContextValue = {
  accessToken: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  user: AuthUser | null;
  signIn: (user: AuthUser, accessToken: string) => void;
  signOut: () => void;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const syncAuthState = () => {
      const storedAuthState = readStoredAuthState();
      setUser(storedAuthState.user);
      setAccessToken(storedAuthState.accessToken);
      setIsReady(true);
    };

    syncAuthState();

    window.addEventListener(AUTH_STATE_CHANGE_EVENT, syncAuthState);

    return () => {
      window.removeEventListener(AUTH_STATE_CHANGE_EVENT, syncAuthState);
    };
  }, []);

  const signIn = React.useCallback(
    (nextUser: AuthUser, nextAccessToken: string) => {
      setStoredAuthState({
        accessToken: nextAccessToken,
        user: nextUser,
      });
    },
    [],
  );

  const signOut = React.useCallback(() => {
    clearStoredAuthState();
  }, []);

  const value = {
    accessToken,
    isAuthenticated: Boolean(user && accessToken),
    isReady,
    user,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}

export type { AuthUser };
