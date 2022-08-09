import { useContext, useEffect, useState } from 'react';
import { articleContext } from '../contexts/ArticleListContext';
import { getArticleListApi } from '../api/requests';

import ArticlePreview from '../components/ArticlePreview';

export default function Home() {
  const { articles, updateArticle } = useContext(articleContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await getArticleListApi('post', 'all', currentPage);
      updateArticle(response);
    })();
  }, []);

  return (
    <>
      {articles.map((article) => (
        <ArticlePreview key={article.id} article={article} />
      ))}
    </>
  );
}
