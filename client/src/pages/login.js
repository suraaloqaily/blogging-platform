'use client'
import { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/router";
import Loading from "@/app/components/Loading";
import LoginForm from "@/app/components/LoginForm";

const Login = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/homepage");
    }
  }, [user, router]);

  if (loading) {
    return <Loading />;
  }
  return !user ? <LoginForm /> : null;
};

export default Login;
