import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import ArticleDetail from '../../../../components/ArticleDetail';

import { getArticleDetailApi } from '../../../../api/requests';
import { categoryContext } from '../../../../contexts/CategoryContext';
import Header from '../../../../components/Header';
import Layout from '../../../../components/Layout';

export default function Detail() {
  const router = useRouter();
  const [article, setArticle] = useState<string>('');
  const { updateCategory } = useContext(categoryContext);

  useEffect(() => {
    (async () => {
      if (!router.isReady) return;

      updateCategory('note');

      const contents = await getArticleDetailApi(`${router.query.id}`);
      setArticle(contents);
    })();
  }, [router.isReady]);

  return (
    <>
      <Layout center={<ArticleDetail article={article} />} />
    </>
  );
}
