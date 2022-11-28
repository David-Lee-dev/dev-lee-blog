import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => setIsLoading(true));
    Router.events.on('routeChangeComplete', (url) => setIsLoading(false));
    Router.events.on('routeChangeError', (url) => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <Component {...pageProps} />
    </>
  );
}
