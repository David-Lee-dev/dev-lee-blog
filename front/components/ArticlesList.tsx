import { useContext, useEffect, useState } from 'react';

import { getArticleListApi } from '../api/requests';
import { articleContext } from '../contexts/ArticleListContext';
import ArticlePreview from './ArticlePreview';

export default function Articles({ type }: Props) {
  const { articles, updateArticle } = useContext(articleContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await getArticleListApi(type, 'all', currentPage);
      console.log(response);
      updateArticle(response);
    })();
  }, []);

  return (
    <>
      {articles &&
        articles.map((article) => (
          <ArticlePreview key={article.id} article={article} />
        ))}
    </>
  );
}

interface Props {
  type: string;
}
