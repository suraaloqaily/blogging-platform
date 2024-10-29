import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import Loading from "@/app/components/Loading";

const Custom404 = () => {
  const { user } = useAuth();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "1rem",
    },
    text: {
      marginBottom: "2rem",
      color: "#666",
    },
    link: {
      padding: "0.75rem 1.5rem",
      backgroundColor: "#3b82f6",
      color: "white",
      borderRadius: "0.375rem",
      textDecoration: "none",
      transition: "background-color 0.2s",
    },
  };
  useEffect(() => {
    if (!user) {
      return;
    }
  }, [user]);

  if (!user) {
    return <Loading />;
  }
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.text}>
        The blog post you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/homepage"
        style={styles.link}>
        Return to Home
      </Link>
    </div>
  );
};

export default Custom404;
