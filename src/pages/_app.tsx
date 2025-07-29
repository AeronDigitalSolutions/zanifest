import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Scroll to top on every route change
function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

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
