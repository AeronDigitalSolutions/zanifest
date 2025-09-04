import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // disable browser scroll restore
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // force scroll to top on route change
    const handleRouteChange = () => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
