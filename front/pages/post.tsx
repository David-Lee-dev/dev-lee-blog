import { useContext, useEffect, useState } from 'react';
import { getArticleListApi } from '../api/requests';
import ArticlePreview from '../components/ArticlePreview';
import SideMenu from '../components/SideMenu';
import { articleContext } from '../contexts/ArticleListContext';

export default function Post() {
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
      <SideMenu type="post" />
      {articles.map((article) => (
        <ArticlePreview key={article.id} article={article} />
      ))}
    </>
  );
}
