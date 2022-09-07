import { useContext, useEffect } from 'react';

import { getArticleListApi } from '../api/requests';
import { articleContext } from '../contexts/ArticleListContext';
import ArticlePreview from './ArticlePreview';
import PageNav from './PageNav';
import SearchBar from './SearchBar';

export default function Articles({ type }: Props) {
  const { articles, updateArticle, pages, updatePages } =
    useContext(articleContext);

  useEffect(() => {
    (async () => {
      const response = await getArticleListApi(type, 'all', 1);

      updateArticle(response.articles);
      updatePages(response.cnt);
    })();
  }, []);

  return (
    <>
      <SearchBar type={type} />
      {articles &&
        articles.map((article) => (
          <ArticlePreview key={article.id} article={article} type={type} />
        ))}
      {pages.length > 1 && <PageNav type={type} />}
    </>
  );
}

interface Props {
  type: string;
}
