import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

// ✅ Scroll to top on route change
function ScrollToTop() {
  const router = useRouter();

 useEffect(() => {
  const handleRouteChange = (url: string) => {
    // Wait a tick to ensure new page DOM is ready
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 10);
  };

  router.events.on("routeChangeComplete", handleRouteChange);
  return () => {
    router.events.off("routeChangeComplete", handleRouteChange);
  };
}, []);

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={(pageProps as any).session}>
      <ScrollToTop />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
