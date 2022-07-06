import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "src/components/Navbar";
import Sidebar from "src/components/Sidebar";
import "src/styles/globals.css";
import Progressbar from "nextjs-progressbar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <>
      <Progressbar
        color="#000000"
        showOnShallow
        options={{ showSpinner: false }}
      />
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
      >
        <div className="max-w-[1280px] m-auto max-h-[100vh] :">
          <Navbar />
          <div className="flex gap-6 md:gap-20 ">
            <div>
              <Sidebar />
            </div>
            <div className="flex flex-col gap-10 overflow-auto flex-1">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default MyApp;
