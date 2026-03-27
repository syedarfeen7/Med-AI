import type { AuthUser } from "@/features/auth/types/auth";

type StoredAuthState = {
  accessToken: string | null;
  user: AuthUser | null;
};

const AUTH_STORAGE_KEY = "medai.auth.state";
const AUTH_STATE_CHANGE_EVENT = "medai:auth-state-changed";

function getEmptyAuthState(): StoredAuthState {
  return {
    accessToken: null,
    user: null,
  };
}

function emitAuthStateChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(AUTH_STATE_CHANGE_EVENT));
}

export function readStoredAuthState(): StoredAuthState {
  if (typeof window === "undefined") {
    return getEmptyAuthState();
  }

  const storedAuthState = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedAuthState) {
    return getEmptyAuthState();
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
    return getEmptyAuthState();
  }
}

export function setStoredAuthState(state: StoredAuthState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  emitAuthStateChange();
}

export function updateStoredAccessToken(accessToken: string) {
  const currentState = readStoredAuthState();

  setStoredAuthState({
    ...currentState,
    accessToken,
  });
}

export function clearStoredAuthState() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  emitAuthStateChange();
}

export { AUTH_STATE_CHANGE_EVENT };
export type { StoredAuthState };
