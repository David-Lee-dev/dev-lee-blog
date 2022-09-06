import { useContext, useEffect } from 'react';

import { getArticleListApi } from '../api/requests';
import { articleContext } from '../contexts/ArticleListContext';
import ArticlePreview from './ArticlePreview';
import SearchBar from './SearchBar';

export default function Articles({ type }: Props) {
  const { articles, updateArticle } = useContext(articleContext);

  useEffect(() => {
    (async () => {
      const response = await getArticleListApi(type, 'all', 1);
      updateArticle(response);
    })();
  }, []);

  return (
    <>
      <SearchBar type={type} />
      {articles &&
        articles.map((article) => (
          <ArticlePreview key={article.id} article={article} type={type} />
        ))}
    </>
  );
}

interface Props {
  type: string;
}
