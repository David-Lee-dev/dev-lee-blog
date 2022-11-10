import { useCallback, useContext, useState } from 'react';
import { debounce } from 'lodash';

import { getArticleListApi } from '../api/requests';
import { articleContext } from '../contexts/ArticleListContext';
import s from '../styles/SearchBar.module.scss';

export default function SearchBar({ type }: Props) {
  const [value, setValue] = useState('');
  const { updateArticle, updatePages } = useContext(articleContext);

  const searchArticles = useCallback(
    debounce(async (value) => {
      let response = null;

      if (!value) response = await getArticleListApi(type, 1);
      else response = await getArticleListApi(type, 1, { searchQuery: value });

      updateArticle(response.articles);
      updatePages(response.cnt);
    }, 500),
    []
  );

  const inputHandler = (newValue: string) => {
    setValue(() => newValue);
    searchArticles(newValue);
  };

  return (
    <div className={s.search__bar}>
      <input
        type="text"
        value={value}
        onChange={(e) => inputHandler(e.target.value)}
      />
    </div>
  );
}

interface Props {
  type: string;
}
