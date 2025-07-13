"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "../lib/axios";
import { useRouter } from "next/navigation";

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
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>; // 👈 ADD THIS
  changePassword: (passwords: any) => Promise<void>; // 👈 ADD THIS
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (token) => {
    console.log("Fetching user with accessToken:", token);
    if (!token) return;
    try {
      const res = await axios.get("auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      console.log("User fetched successfully:", res.data);
    } catch (err) {
      setUser(null);
    }
  };

  const login = async (user: any, accessToken: any) => {
    console.log("Attempting login with:", { user, accessToken });
    try {
      // const res = await axios.post('/auth/login', { email, password });
      // console.log('Login response:', res.data);
      // setAccessToken(res.data.accessToken);
      // setUser(res.data.user);
      setAccessToken(accessToken);
      setUser(user);
      localStorage.setItem("accessToken", accessToken);
      router.push("/crm");
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("accessToken"); // ✅
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!accessToken) {
      throw new Error("No access token available");
    }

    try {
      const res = await axios.put("/auth/profile", updates, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Update the user state with the latest data
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
    if (!accessToken) {
      throw new Error("No access token available");
    }

    try {
      const res = await axios.post("/auth/change-password", passwords, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error("Change password failed:", err);
      throw new Error("Failed to change password");
    }
  };
  useEffect(() => {
    const tryRefresh = async () => {
      const token = localStorage.getItem("accessToken");
      console.log("New Checking localStorage for accessToken:", token);

      if (token) {
        setAccessToken(token);
        setLoading(false);
        await fetchUser(token); // optional if needed at this point
        return;
      }

      try {
        const res = await axios.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        const newToken = res.data.data.accessToken;

        setAccessToken(newToken);
        localStorage.setItem("accessToken", newToken);
        await fetchUser(newToken);
      } catch (err) {
        console.error("Refresh failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    tryRefresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        updateUser,
        changePassword,
        login,
        logout,
        loading,
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
