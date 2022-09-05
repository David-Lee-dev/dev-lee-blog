import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import SideMenu from '../../../../components/SideMenu';
import ArticleDetail from '../../../../components/ArticleDetail';

import { getArticleDetailApi, getCategoryListApi } from '../../../../api/requests';
import { Article, defaultArticle } from '../../../../types';
import { categoryContext } from '../../../../contexts/CategoryContext';

export default function Detail() {
  const router = useRouter();
  const [article, setArticle] = useState<Article>(defaultArticle);
  const { updateCategory } = useContext(categoryContext);

  useEffect(() => {
    (async () => {
      if (!router.isReady) return;

      const catetoryResponse = await getCategoryListApi('post');
      updateCategory(catetoryResponse);

      const contentsResponse = await getArticleDetailApi('note', `${router.query.id}`);
      setArticle(contentsResponse);
    })();
  }, [router.isReady]);

  return (
    <>
      <SideMenu />
      <ArticleDetail article={article} />
    </>
  );
}
