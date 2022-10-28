import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import SideMenu from '../../../../components/SideMenu';
import ArticleDetail from '../../../../components/ArticleDetail';

import {
  getArticleDetailApi,
  getCategoryListApi,
} from '../../../../api/requests';
import { categoryContext } from '../../../../contexts/CategoryContext';

export default function Detail() {
  const router = useRouter();
  const [article, setArticle] = useState<string>('');
  const { updateCategory } = useContext(categoryContext);

  useEffect(() => {
    (async () => {
      if (!router.isReady) return;

      const catetoryResponse = await getCategoryListApi('post');
      updateCategory(catetoryResponse);

      const contents = await getArticleDetailApi('post', `${router.query.id}`);
      console.log(contents);
      setArticle(contents);
    })();
  }, [router.isReady]);

  return (
    <>
      <SideMenu />
      <ArticleDetail article={article} />
    </>
  );
}
