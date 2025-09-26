// src/context/AuthContext.jsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

// 👇 AJUSTE este import conforme seu projeto:
// import { auth } from "../firebase";
import { auth } from "../lib/firebase";

export const AuthContext = createContext(null);

// Hook de conveniência (é isso que o Login/Register importam)
export function useAuth() {
  return useContext(AuthContext) || {};
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Observa mudanças de autenticação
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signIn = useCallback(async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setUser(cred.user);
    return cred.user;
  }, []);

  const signUp = useCallback(
    async ({ name, email, password, verifyEmail = true }) => {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      if (verifyEmail) {
        try {
          await sendEmailVerification(cred.user);
        } catch {}
      }
      setUser(cred.user);
      return cred.user;
    },
    []
  );

  const signOut = useCallback(async () => {
    await fbSignOut(auth);
    setUser(null);
  }, []);

  const sendReset = useCallback(async (email) => {
    await sendPasswordResetEmail(auth, email);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      signIn,
      signUp,
      signOut,
      sendReset,
    }),
    [user, loading, signIn, signUp, signOut, sendReset]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
