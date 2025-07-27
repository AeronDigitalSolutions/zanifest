import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
// import type { AppProps } from "next/app";
// import CriticalIllnessInsurance from "./criticalillnessinsurance";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

import type { AppProps } from "next/app";



function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleRouteChange = () => {
      window.scrollTo(0, 0);
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
