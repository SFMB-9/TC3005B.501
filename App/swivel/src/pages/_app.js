import Head from "next/head";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from 'next-auth/react';

import Script from "next/script";
import { theme } from "@/utils/theme";
import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.css";
import "@/styles/hero.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
