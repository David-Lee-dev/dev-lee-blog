import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header';
import ArticleProvider from '../contexts/ArticleListContext';
import CategoryProvider from '../contexts/CategoryContext';
import '../styles/_global.scss';

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
      <Header />
      <section style={{ paddingTop: '84px', minHeight: '200vh' }}>
        <CategoryProvider>
          <ArticleProvider>
            <Component {...pageProps} />
          </ArticleProvider>
        </CategoryProvider>
      </section>
    </>
  );
}

export default MyApp;
