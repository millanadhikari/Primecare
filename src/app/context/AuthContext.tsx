"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "../lib/axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner"; // Optional: if you're using toast

type User = {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any;
};

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  login: (user: User, accessToken: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  setUser: (user: User | null) => void;
  changePassword: (passwords: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
  loading: boolean;
  fetchUser:any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (token: string) => {
    if (!token) return;
    try {
      const res = await axios.get("auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      console.log("Fetched user:", res.data.data.user);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
    }
  };

  const login = async (user: User, accessToken: string) => {
    try {
      setAccessToken(accessToken);
      setUser(user);
      localStorage.setItem("accessToken", accessToken);
      console.log("Redirecting to /crm...");
      setTimeout(() => {
        router.push("/crm");
      }, 100);
    } catch (err: any) {
      console.error("Login error:", err);
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.warn("Logout request failed:", err);
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("accessToken");
      router.push("/login");
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!accessToken) throw new Error("No access token");

    try {
      const res = await axios.put("/auth/profile", updates, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setUser(res.data.user);

    } catch (err) {
      console.error("Update user failed:", err);
      throw new Error("Failed to update profile");
    }
  };

  const changePassword = async (passwords: {
    currentPassword: string;
    newPassword: string;
  }) => {
    if (!accessToken) throw new Error("No access token");

    try {
      const res = await axios.post("/auth/change-password", passwords, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return res.data;
    } catch (err) {
      console.error("Change password failed:", err);
      throw new Error("Failed to change password");
    }
  };

  useEffect(() => {
    const publicRoutes = ["/login", "/reset-password"];

    if (publicRoutes.includes(pathname) || user) {
      setLoading(false);
      return;
    }

    const tryRefresh = async () => {
      const storedToken = localStorage.getItem("accessToken");

      if (storedToken) {
        setAccessToken(storedToken);
        await fetchUser(storedToken);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        const newToken = res.data?.data?.accessToken;

        if (newToken) {
          setAccessToken(newToken);
          localStorage.setItem("accessToken", newToken);
          await fetchUser(newToken);
        } else {
          throw new Error("No token returned");
        }
      } catch (err: any) {
        console.error("Refresh token error:", err?.response || err);
        setUser(null);
        localStorage.removeItem("accessToken");
        router.push("/login");
        toast?.error?.("Session expired. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    tryRefresh();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        login,
        logout,
        updateUser,
        changePassword,
        loading,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
