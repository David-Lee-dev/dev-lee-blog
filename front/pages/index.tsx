import { useContext, useEffect, useState } from 'react';
import s from '../styles/Home.module.scss';
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
    <section className={s.contents}>
      {articles.map((article) => (
        <ArticlePreview key={article.id} article={article} />
      ))}
    </section>
  );
}
