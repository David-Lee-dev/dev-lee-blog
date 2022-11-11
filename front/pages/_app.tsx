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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Header />
        <CategoryProvider>
          <ArticleProvider>
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
