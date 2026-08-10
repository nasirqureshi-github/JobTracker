"use client";
import { useEffect, useState } from "react";
import { api } from "../services/api";
export function useAuth() {
  const [user, setUser] = useState(null),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("jt_token")) return setLoading(false);
    api("/auth/me")
      .then((d) => setUser(d.user))
      .catch(() => localStorage.removeItem("jt_token"))
      .finally(() => setLoading(false));
  }, []);
  return {
    user,
    loading,
    logout: () => {
      localStorage.removeItem("jt_token");
      location.href = "/login";
    },
  };
}
