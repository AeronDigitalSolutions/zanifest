import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
// import type { AppProps } from "next/app";
// import CriticalIllnessInsurance from "./criticalillnessinsurance";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

import type { AppProps } from "next/app";



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
