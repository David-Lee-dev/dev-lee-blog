import { useContext, useMemo } from 'react';
import Link from 'next/link';

import { articleContext } from '../contexts/ArticleListContext';
import { getArticleListApi } from '../api/requests';
import { categoryContext } from '../contexts/CategoryContext';
import { useRouter } from 'next/router';

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledBox = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    padding: '16px 60px',
  },
  [theme.breakpoints.down('lg')]: {
    padding: '8px 20px',
  },
}));

export default function SideMenu() {
  const pathname = useRouter().pathname;

  const type = useMemo(() => getArticleType(pathname), []);

  const { updateArticle, updatePages } = useContext(articleContext);
  const { category } = useContext(categoryContext);

  const selectedHandler = async (id: number) => {
    console.log(type);
    if (type) {
      const response = await getArticleListApi(type, 1, { categoryId: id });

      updateArticle(response.articles);
      updatePages(response.count);
    }
  };

  return (
    <StyledBox
      sx={{
        width: '100%',
        position: 'sticky',
        top: 100,
      }}
    >
      <Typography
        sx={{
          padding: '0 5px',
        }}
      >
        Category
      </Typography>
      <hr />
      {category.map((c) => (
        <Typography
          key={c.id}
          onClick={() => selectedHandler(c.id)}
          sx={{
            fontSize: 16,
            marginBottom: 1,
            padding: '0 5px',
          }}
        >
          <Link href={`/article/${type}`}>
            <a>{c.name}</a>
          </Link>
        </Typography>
      ))}
    </StyledBox>
  );
}

function getArticleType(pathname: string): string | null {
  if (pathname.search('post') > 0) return 'post';
  else if (pathname.search('note') > 0) return 'note';
  else return null;
}
