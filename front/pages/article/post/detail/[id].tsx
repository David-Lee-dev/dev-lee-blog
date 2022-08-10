import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import SideMenu from '../../../../components/SideMenu';
import ArticleDetail from '../../../../components/ArticleDetail';

import { getArticleDetailApi } from '../../../../api/requests';
import { Article, defaultArticle } from '../../../../types';
import { categoryContext } from '../../../../contexts/CategoryContext';

export default function Detail() {
  const router = useRouter();
  const [article, setArticle] = useState<Article>(defaultArticle);
  const { category } = useContext(categoryContext);

  useEffect(() => {
    (async () => {
      if (!router.isReady) return;

      const response = await getArticleDetailApi('post', `${router.query.id}`);
      setArticle(response);
    })();
  }, [router.isReady]);

  return (
    <>
      <SideMenu category={category} />
      <ArticleDetail article={article} />
    </>
  );
}
