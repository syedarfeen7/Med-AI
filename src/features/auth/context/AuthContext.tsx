import React from "react";

type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "patient" | "doctor";
};

type StoredAuthState = {
  accessToken: string | null;
  user: AuthUser | null;
};

type AuthContextValue = {
  accessToken: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  user: AuthUser | null;
  signIn: (user: AuthUser, accessToken: string) => void;
  signOut: () => void;
};

const AUTH_STORAGE_KEY = "medai.auth.state";

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

function readStoredAuthState(): StoredAuthState {
  if (typeof window === "undefined") {
    return {
      accessToken: null,
      user: null,
    };
  }

  const storedAuthState = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedAuthState) {
    return {
      accessToken: null,
      user: null,
    };
  }

  try {
    const parsedState = JSON.parse(storedAuthState) as Partial<StoredAuthState>;

    return {
      accessToken:
        typeof parsedState.accessToken === "string"
          ? parsedState.accessToken
          : null,
      user: parsedState.user ?? null,
    };
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return {
      accessToken: null,
      user: null,
    };
  }
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const storedAuthState = readStoredAuthState();
    setUser(storedAuthState.user);
    setAccessToken(storedAuthState.accessToken);
    setIsReady(true);
  }, []);

  const signIn = React.useCallback((nextUser: AuthUser, nextAccessToken: string) => {
    setUser(nextUser);
    setAccessToken(nextAccessToken);
    window.localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        accessToken: nextAccessToken,
        user: nextUser,
      } satisfies StoredAuthState),
    );
  }, []);

  const signOut = React.useCallback(() => {
    setUser(null);
    setAccessToken(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
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
