import { useContext, useState } from 'react';
import { getArticleListApi } from '../api/requests';
import { articleContext } from '../contexts/ArticleListContext';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// import s from '../styles/PageNav.module.scss';

export default function PageNav({ type }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { updateArticle, pages } = useContext(articleContext);

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    if (value > pages) setCurrentPage(pages);
    else if (value < 1) setCurrentPage(1);
    else setCurrentPage(value);

    const response = await getArticleListApi(type, value);
    updateArticle(response.articles);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: '100%',
      }}
    >
      <Pagination
        count={pages}
        page={currentPage}
        onChange={handleChange}
        shape="rounded"
        sx={{ margin: '20px auto' }}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}

interface Props {
  type: string;
}
