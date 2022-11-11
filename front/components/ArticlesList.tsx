import { useContext, useEffect } from 'react';

import { getArticleListApi } from '../api/requests';
import { articleContext } from '../contexts/ArticleListContext';
import ArticlePreview from './ArticlePreview';
import PageNav from './PageNav';
import SearchBar from './SearchBar';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function ArticleList({ type }: Props) {
  const { articles, updateArticle, pages, updatePages } =
    useContext(articleContext);

  useEffect(() => {
    (async () => {
      const response = await getArticleListApi(type);

      updateArticle(response.articles);
      updatePages(response.count);
    })();
  }, []);

  return (
    <>
      <SearchBar type={type} />
      <Box
        sx={{
          flexGrow: 1,
        }}
        component="article"
      >
        <Grid container spacing={2} sx={{ minHeight: 300 }}>
          {articles &&
            articles.map((article) => (
              <Grid item xs={12} key={article.id}>
                <ArticlePreview article={article} type={type} />
              </Grid>
            ))}
          {pages >= 1 && <PageNav type={type} />}
        </Grid>
      </Box>
    </>
  );
}

interface Props {
  type: string;
}
