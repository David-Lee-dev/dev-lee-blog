import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import type { AppProps } from 'next/app';

import Footer from '../components/Footer';
import Header from '../components/Header';

import ArticleProvider from '../contexts/ArticleListContext';
import CategoryProvider from '../contexts/CategoryContext';
import '../styles/_global.scss';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>I&apos;m dev-lee</title>
        <meta property="og:title" content="I'm dev-lee" />
        <meta
          property="og:description"
          content="안녕하세요. 개발자 이주현입니다."
        />
        <meta property="og:url" content="https://im-dev-lee.site/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9fbb7d68-e4a0-4f87-811d-db268d46b58f/57592095.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221111T175236Z&X-Amz-Expires=86400&X-Amz-Signature=9d0e52a4386b9256a36e08bb09c1801934ec192eb346c1216bd3b3b935eae4a2&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%2257592095.png%22&x-id=GetObject"
        />
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
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <CategoryProvider>
          <ArticleProvider>
            <Header />
            <Box
              sx={{
                paddingTop: 5,
                minHeight: '100vh',
              }}
              bgcolor="background.default"
            >
              <Component {...pageProps} />
            </Box>
          </ArticleProvider>
        </CategoryProvider>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default MyApp;

const theme = createTheme({
  palette: {
    primary: {
      main: '#393e46',
    },
    secondary: {
      main: '#929aab',
    },
    warning: {
      main: '#f0a500',
    },
    error: {
      main: '#ff5656',
    },
    info: {
      main: '#2185d5',
    },
    success: {
      main: '#6d9886',
    },
  },
  typography: {
    fontFamily: ['Spoqa Han Sans Neo', 'sans-serif'].join(','),
  },
});
