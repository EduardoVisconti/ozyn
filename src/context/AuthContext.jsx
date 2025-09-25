import { createContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../lib/firebase";

export const AuthContext = createContext(null);

function mapError(e) {
  const code = e?.code || "";
  const M = {
    "auth/invalid-email": "Invalid email address.",
    "auth/user-disabled": "This account is disabled.",
    "auth/user-not-found": "User not found.",
    "auth/wrong-password": "Incorrect password.",
    "auth/email-already-in-use": "Email is already in use.",
    "auth/weak-password": "Weak password (min 6 characters).",
    "auth/operation-not-allowed": "Email/password sign-in is not enabled in Firebase.",
    "auth/invalid-api-key": "Invalid API key. Check your Firebase config (.env.local).",
    default: "Something went wrong. Please try again.",
  };
  return M[code] || M.default;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (e) {
      console.error("Login error:", e?.code, e?.message, e);
      throw e;
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(res.user, { displayName: name });
      return res.user;
    } catch (e) {
      console.error("Register error:", e?.code, e?.message, e);
      throw e;
    }
  };

  const logout = () => signOut(auth);

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      console.error("Reset password error:", e?.code, e?.message, e);
      throw e;
    }
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout, resetPassword, mapError }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
