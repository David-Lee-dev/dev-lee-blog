import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState, useContext } from 'react';
import { throttle } from 'lodash';

import { categoryContext } from '../contexts/CategoryContext';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import SideMenu from './SideMenu';

const StyledBox = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

const StyledP = styled('p')(({ theme }) => ({
  'marginRight': 20,
  'color': theme.palette.background.default,
  'fontSize': 25,
  '&.active': {
    color: theme.palette.info.main,
  },
}));

export default function Header() {
  const pathname = useRouter().pathname;
  const [scrollGuage, setScrollGuage] = useState<number>(0);
  const { updateCategory } = useContext(categoryContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      return;
    }

    const type = navMenu.filter((menu) => pathname.search(menu.key) >= 0);
    if (type.length === 0) return;

    updateCategory(type[0].key);
  }, [pathname]);

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        width: '100vw',
        zIndex: 1000,
      }}
      component="header"
      bgcolor="primary.main"
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
            <Box sx={{ display: 'flex', padding: 1 }}>
              {navMenu.map((menu) => (
                <StyledP
                  key={menu.name}
                  className={
                    pathname === menu.route || pathname.search(menu.key) >= 0
                      ? 'active'
                      : ''
                  }
                >
                  <Link href={`${menu.route}`}>
                    <a>{menu.name}</a>
                  </Link>
                </StyledP>
              ))}
            </Box>
            <StyledBox>
              <Button
                id="category-menu-button"
                aria-controls={open ? 'ategory-menu-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MenuIcon
                  sx={{
                    color: 'background.default',
                  }}
                />
              </Button>
              <Menu
                id="ategory-menu-menu"
                aria-labelledby="category-menu-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <SideMenu />
              </Menu>
            </StyledBox>
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
            backgroundColor: 'warning.main',
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
