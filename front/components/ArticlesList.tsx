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
      <Box component="article">
        {articles &&
          articles.map((article) => (
            <ArticlePreview key={article.id} article={article} type={type} />
          ))}
        {pages > 1 && <PageNav type={type} />}
      </Box>
    </>
  );
}

interface Props {
  type: string;
}
