import { useContext, useEffect } from 'react';

import ArticlesList from '../../../components/ArticlesList';
import SideMenu from '../../../components/SideMenu';

import { getCategoryListApi } from '../../../api/requests';
import { categoryContext } from '../../../contexts/CategoryContext';

export default function Post() {
  const { updateCategory } = useContext(categoryContext);

  useEffect(() => {
    (async () => {
      const response = await getCategoryListApi('post');
      updateCategory(response);
    })();
  }, []);

  return (
    <>
      <SideMenu />
      <ArticlesList type="post" />
    </>
  );
}
