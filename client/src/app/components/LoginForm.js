import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(credentials);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authWrapper}>
        <div className={styles.authNav}>
          <Link
            href="/login"
            className={styles.activeNav}>
            Login
          </Link>
          <Link
            href="/register"
            className={styles.inactiveNav}>
            Register
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className={styles.authForm}>
          {error && <div className={styles.error}>{error}</div>}
          <input
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <input
            type="password"
            autoComplete="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <button type="submit">Login</button>
          <p className={styles.switchText}>
            Do not have an account? <Link href="/register">Register here </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
