import { AuthProvider } from "@/app/context/AuthContext";
import { BlogsProvider } from "@/app/context/BlogsContext";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import "@/styles/globals.css";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const authRoutes = [
    "/blogging-platform/login",
    "/blogging-platform/register",
  ];
  const isAuthRoute = authRoutes.includes(router.pathname);

  useEffect(() => {
    const cookies = parseCookies();
    const isAuthenticated = !!cookies.token;
    console.log(isAuthenticated, "isAuthenticated");
    console.log(isAuthRoute, "isAuthRoute");
    console.log(router.pathname, "router.pathname");
    if (isAuthenticated && isAuthRoute) {
      router.push("/blogging-platform/homepage");
      return;
    }

    if (!isAuthenticated && !isAuthRoute && router.pathname !== "/") {
      router.push("/blogging-platform/login");
      return;
    }
  }, [router.pathname, isAuthRoute, router]);

  return (
    <AuthProvider>
      {isAuthRoute ? (
        <Component {...pageProps} />
      ) : (
        <BlogsProvider>
          <Component {...pageProps} />
        </BlogsProvider>
      )}
    </AuthProvider>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  const cookies = parseCookies(ctx);
  const isAuthenticated = !!cookies.token;

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, isAuthenticated };
};
