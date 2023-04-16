import '@/styles/globals.css'
import '@/styles/hero.css'
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";
import { useEffect } from 'react'
import { theme } from '../utils/theme'
import { ThemeProvider } from '@mui/material'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  ) 
}
