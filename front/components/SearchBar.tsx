import { useCallback, useContext, useState } from 'react';
import { debounce, unset } from 'lodash';

import { getArticleListApi } from '../api/requests';
import { articleContext } from '../contexts/ArticleListContext';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledInput = styled('input')(({ theme }) => ({
  all: 'unset',
  width: '100%',
  padding: '5px 20px',
  fontSize: 20,
  color: theme.palette.background.default,
  backgroundColor: theme.palette.primary.main,
  boxSizing: 'border-box',
  borderRadius: 50,
}));
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
      sx={{
        position: 'sticky',
        display: 'flex',
        alignItems: 'center',
        height: 60,
        top: 45,
        margin: '20px 0',
      }}
      bgcolor="background.default"
    >
      <StyledInput
        value={value}
        onChange={(e) => inputHandler(e.target.value)}
      />
    </Box>
  );
}

interface Props {
  type: string;
}
