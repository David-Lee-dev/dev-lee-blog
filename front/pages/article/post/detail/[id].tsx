import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import SideMenu from '../../../../components/SideMenu';
import ArticleDetail from '../../../../components/ArticleDetail';
import HideOnSmallWindowBox from '../../../../components/HideOnSmalWindowBox';

import { getArticleDetailApi } from '../../../../api/requests';
import { categoryContext } from '../../../../contexts/CategoryContext';

import Grid from '@mui/material/Grid';

export default function Detail() {
  const router = useRouter();
  const [article, setArticle] = useState<string>('');
  const { updateCategory } = useContext(categoryContext);

  useEffect(() => {
    (async () => {
      if (!router.isReady) return;

      updateCategory('post');

      const contents = await getArticleDetailApi(`${router.query.id}`);
      setArticle(contents);
    })();
  }, [router.isReady]);

  return (
    <Grid container spacing={2}>
      <Grid item xl={3} lg={2.5} md={2}>
        <HideOnSmallWindowBox>
          <SideMenu />
        </HideOnSmallWindowBox>
      </Grid>
      <Grid item xl={6} lg={7} md={8}>
        <ArticleDetail article={article} />
      </Grid>
      <Grid item xl={3} lg={2.5} md={2}></Grid>
    </Grid>
  );
}
