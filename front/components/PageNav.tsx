import { useContext, useState } from 'react';
import { getArticleListApi } from '../api/requests';
import { articleContext } from '../contexts/ArticleListContext';

import s from '../styles/PageNav.module.scss';

export default function PageNav({ type }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { updateArticle, pages, updatePages } = useContext(articleContext);

  const clickHandler = async (page: number) => {
    if (page > pages.length) setCurrentPage(pages.length);
    else if (page < 1) setCurrentPage(1);
    else setCurrentPage(page);

    const response = await getArticleListApi(type, 'all', page);
    updateArticle(response.articles);
    updatePages(response.cnt);
  };

  return (
    <div className={s.page__navigation}>
      <button className={s.sell} onClick={() => clickHandler(currentPage - 1)}>
        {'<'}
      </button>
      {pages.map((page, idx) => (
        <button
          key={idx}
          className={`${s.sell} ${page === currentPage ? s.active : ''}`}
          onClick={() => clickHandler(page)}
        >
          {page}
        </button>
      ))}
      <button className={s.sell} onClick={() => clickHandler(currentPage + 1)}>
        {'>'}
      </button>
    </div>
  );
}

interface Props {
  type: string;
}
