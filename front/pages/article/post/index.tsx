import ArticlesList from '../../../components/ArticlesList';
import SideMenu from '../../../components/SideMenu';
import HideOnSmallWindowBox from '../../../components/HideOnSmalWindowBox';

import Grid from '@mui/material/Grid';

export default function Post() {
  return (
    <Grid container spacing={0} sx={{ minHeight: '50vh' }}>
      <Grid item xl={3} lg={2.5} md={2}>
        <HideOnSmallWindowBox>
          <SideMenu />
        </HideOnSmallWindowBox>
      </Grid>
      <Grid item xl={6} lg={7} md={8} sx={{ width: '100%', padding: '0 10px' }}>
        <ArticlesList type="post" />
      </Grid>
      <Grid item xl={3} lg={2.5} md={2}></Grid>
    </Grid>
  );
}
