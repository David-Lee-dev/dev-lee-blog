import Grid from '@mui/material/Grid';
import Header from './Header';
import HideOnSmallWindowBox from './HideOnSmalWindowBox';
import SideMenu from './SideMenu';

export default function Layout({
  left = (
    <HideOnSmallWindowBox>
      <SideMenu />
    </HideOnSmallWindowBox>
  ),
  center,
  right,
}: Props) {
  return (
    <>
      <Header />
      <Grid container spacing={2} sx={{ minHeight: '100vh', paddingTop: 10 }}>
        <Grid item xl={3} lg={2.5} md={2}>
          {left}
        </Grid>
        <Grid item xl={6} lg={7} md={8}>
          {center}
        </Grid>
        <Grid item xl={3} lg={2.5} md={2}>
          {right}
        </Grid>
      </Grid>
    </>
  );
}

interface Props {
  left?: React.ReactNode;
  center: React.ReactNode;
  right?: React.ReactNode;
}
