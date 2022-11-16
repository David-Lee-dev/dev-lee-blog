import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { throttle } from 'lodash';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MailIcon from '@mui/icons-material/Mail';
import Grid from '@mui/material/Grid';

export default function Header() {
  const pathname = useRouter().pathname;
  const [scrollGuage, setScrollGuage] = useState<number>(0);

  const scrollHandler = useCallback(
    throttle(() => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;

      setScrollGuage(scrolled);
    }, 50),
    []
  );

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText('aganga7427@gmail.com');

      alert('메일 주소가 클립보드에 복사되었습니다.');
    } catch (error) {
      alert('복사할 수 없습니다.');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100vw',
        zIndex: 1000,
      }}
      component="header"
      bgcolor="background.default"
    >
      <Grid container spacing={0}>
        <Grid item xl={3} lg={2.5} md={2}></Grid>
        <Grid
          item
          xl={6}
          lg={7}
          md={8}
          sx={{ width: '100%', padding: '0 10px' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex' }}>
              {navMenu.map((menu) => (
                <Typography
                  key={menu.name}
                  sx={{
                    marginRight: 5,
                    fontSize: 20,
                    color: `
                      ${
                        pathname === menu.route ||
                        pathname.search(menu.key) >= 0
                          ? '#2185d5'
                          : '#393e46'
                      } `,
                  }}
                >
                  <Link href={`${menu.route}`}>
                    <a>{menu.name}</a>
                  </Link>
                </Typography>
              ))}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Link href="https://github.com/David-Lee-dev">
                <a target="_blank" style={{ width: '25px', padding: '0 20px' }}>
                  <img src="/github.svg" style={{ width: '100%' }} />
                </a>
              </Link>
              <Box
                sx={{ width: 25, margin: '0 10px', cursor: 'pointer' }}
                onClick={handleCopyClipBoard}
              >
                <MailIcon fontSize="large" />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xl={3} lg={2.5} md={2}></Grid>
      </Grid>

      <Box
        sx={{
          height: 4,
          backgroundColor: 'secondary.main',
        }}
      >
        <Box
          sx={{
            height: 4,
            backgroundColor: 'primary.main',
            transition: 'width 0.1s',
            width: `${scrollGuage}%`,
          }}
        ></Box>
      </Box>
    </Box>
  );
}

const navMenu = [
  {
    name: 'HOME',
    route: '/',
    key: 'home',
  },
  {
    name: 'POST',
    route: '/article/post',
    key: 'post',
  },
  {
    name: 'NOTE',
    route: '/article/note',
    key: 'note',
  },
];
