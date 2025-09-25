// src/routes/RequireAuth.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { user, loading } = useContext(AuthContext);
  const loc = useLocation();
  if (loading) return null; // pode trocar por spinner
  return user ? children : <Navigate to="/auth/login" state={{ from: loc }} replace />;
}
