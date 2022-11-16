import { useCallback, useContext, useState } from 'react';
import { debounce } from 'lodash';

import { getArticleListApi } from '../api/requests';
import { articleContext } from '../contexts/ArticleListContext';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function SearchBar({ type }: Props) {
  const [value, setValue] = useState('');
  const { updateArticle, updatePages } = useContext(articleContext);

  const searchArticles = useCallback(
    debounce(async (value) => {
      let response = null;

      if (!value) response = await getArticleListApi(type, 1);
      else response = await getArticleListApi(type, 1, { searchQuery: value });

      updateArticle(response.articles);
      updatePages(response.count);
    }, 500),
    []
  );

  const inputHandler = (newValue: string) => {
    setValue(() => newValue);
    searchArticles(newValue);
  };

  return (
    <Box
      sx={{ position: 'sticky', top: 41, margin: '20px 0' }}
      bgcolor="secondary.main"
    >
      <TextField
        value={value}
        variant="standard"
        label="제목, 태그로 검색하기"
        onChange={(e) => inputHandler(e.target.value)}
        sx={{ width: '100%' }}
      />
    </Box>
  );
}

interface Props {
  type: string;
}
