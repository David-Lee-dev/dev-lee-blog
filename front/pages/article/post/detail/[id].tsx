import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getArticleDetailApi } from '../../../../api/requests';
import ArticleDetail from '../../../../components/ArticleDetail';
import { Article, defaultArticle } from '../../../../types';

export default function Detail() {
  const router = useRouter();
  const [article, setArticle] = useState<Article>(defaultArticle);

  useEffect(() => {
    (async () => {
      if (!router.isReady) return;

      const response = await getArticleDetailApi('post', `${router.query.id}`);
      setArticle(response);
    })();
  }, [router.isReady]);

  return <ArticleDetail article={article} />;
}
