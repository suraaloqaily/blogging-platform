import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkUser = async () => {
    try {
      const cookies = parseCookies();

      if (!cookies.token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.backend_base_path}auth/session`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        destroyCookie(null, "token");
        setUser(null);
      }
    } catch (error) {
      console.error("Check user error:", error);
      destroyCookie(null, "token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch(
        `${process.env.backend_base_path}auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (response.ok && data.token) {
        setCookie(null, "token", data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
        setUser(data.user);
        router.push("/homepage");
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.backend_base_path}auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      destroyCookie(null, "token");
      setUser(null);
      router.push("/login");
    }
  };
  const updateUser = async (formData) => {
    try {
      const cookies = parseCookies();
      const response = await fetch(
        `${process.env.backend_base_path}user/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);

        if (data.token) {
          setCookie(null, "token", data.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
        }

        return { success: true, message: "Profile updated successfully" };
      } else {
        return { success: false, message: data.message || "Update failed" };
      }
    } catch (error) {
      console.error("Profile update error:", error);
      return {
        success: false,
        message: "An error occurred while updating profile",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
