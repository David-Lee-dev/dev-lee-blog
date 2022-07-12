import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

//style
import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>I'm dev-lee</title>
        <meta name="description" content="dev-lee's blog" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css"
        ></link>
        <link
          href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
          rel="stylesheet"
          type="text/css"
        ></link>
      </Head>
      <div className="wrapper">
        <div className="header">
          <Header />
        </div>
        <div className="contents">
          <Component {...pageProps} />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default MyApp;
