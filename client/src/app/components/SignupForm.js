import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "@/app/components/Loading";
import styles from "@/styles/Auth.module.css";
import authService from "@/services/AuthApiServices";
export default function SignupForm() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const register = async (userData) => {
    try {
      const result = await authService.register(userData);
      if (!result.success) {
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 500);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (!userData.name || !userData.email || !userData.password) {
      setError("All fields are required");
      return false;
    }

    if (!userData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    if (userData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(userData);
      if (!result.success) {
        setError(result.message);
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authWrapper}>
        <div className={styles.authNav}>
          <Link
            href="/login"
            className={styles.inactiveNav}>
            Login
          </Link>
          <Link
            href="/register"
            className={styles.activeNav}>
            Register
          </Link>
        </div>

        {isSuccess ? (
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>✓</div>
            <h3>Registration Successful!</h3>
            <p>Redirecting to login page...</p>
            <Loading />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={styles.authForm}>
            {error && <div className={styles.error}>{error}</div>}
            <input
              type="text"
              placeholder="Name"
              autoComplete="name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              required
              minLength={8}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={isLoading ? styles.buttonLoading : ""}>
              {isLoading ? <Loading /> : "Register"}
            </button>
            <p className={styles.switchText}>
              Already have an account? <Link href="/login">Login here</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
