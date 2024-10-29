import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SignupForm from "@/app/components/SignupForm";
import Loading from "@/app/components/Loading";

export default function RegisterPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push("/homepage");
    }
  }, [user, loading, router]);

  if (loading) return <Loading />;

  return !user ? <SignupForm /> : null;
}
