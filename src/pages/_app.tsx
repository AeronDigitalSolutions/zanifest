import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { ConfigProvider, App as AntdApp } from "antd";
import "antd/dist/reset.css"; // reset styles for v5

import type { AppProps } from "next/app";

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
      {/* ✅ Wrap with ConfigProvider */}
      <ConfigProvider>
        <AntdApp>
          <ScrollToTop />
          <Component {...pageProps} />
          <Toaster position="top-center" reverseOrder={false} />
        </AntdApp>
      </ConfigProvider>
    </AuthProvider>
  );
}

export default MyApp;
