import { useContext, useEffect } from 'react';
import { getCategoryListApi } from '../../../api/requests';
import ArticlesList from '../../../components/ArticlesList';
import SideMenu from '../../../components/SideMenu';
import { categoryContext } from '../../../contexts/CategoryContext';

export default function Post() {
  const { category, updateCategory } = useContext(categoryContext);

  useEffect(() => {
    (async () => {
      const response = await getCategoryListApi('post');
      updateCategory(response);
    })();
  }, []);

  return (
    <>
      <SideMenu category={category} />
      <ArticlesList type="post" />
    </>
  );
}