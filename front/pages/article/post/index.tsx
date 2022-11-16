import { useContext, useEffect } from 'react';

import ArticlesList from '../../../components/ArticlesList';
import SideMenu from '../../../components/SideMenu';

import { getCategoryListApi } from '../../../api/requests';
import { categoryContext } from '../../../contexts/CategoryContext';

import Grid from '@mui/material/Grid';

export default function Post() {
  const { updateCategory } = useContext(categoryContext);

  useEffect(() => {
    (async () => {
      const response = await getCategoryListApi('post');
      updateCategory(response);
    })();
  }, []);

  return (
    <Grid container spacing={0} sx={{ minHeight: '50vh' }}>
      <Grid item xl={3} lg={2.5} md={2}>
        <SideMenu />
      </Grid>
      <Grid item xl={6} lg={7} md={8} sx={{ width: '100%', padding: '0 10px' }}>
        <ArticlesList type="post" />
      </Grid>
      <Grid item xl={3} lg={2.5} md={2}></Grid>
    </Grid>
  );
}
