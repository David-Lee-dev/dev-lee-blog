import { useContext, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { articleContext } from '../contexts/ArticleListContext';
import { getArticleListApi } from '../api/requests';
import { categoryContext } from '../contexts/CategoryContext';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SideMenu() {
  const pathname = useRouter().pathname;

  const type = useMemo(() => getArticleType(pathname), []);
  const [openCategory, setOpenCategory] = useState<boolean>(false);

  const { updateArticle, updatePages } = useContext(articleContext);
  const { category, selected, changeSelectedCatetory } =
    useContext(categoryContext);

  const sideMenuHandler = () => setOpenCategory((prev) => !prev);
  const selectedHandler = async (id: number) => {
    console.log(type);
    if (type) {
      const response = await getArticleListApi(type, 1, { categoryId: id });

      updateArticle(response.articles);
      updatePages(response.count);
    }
    changeSelectedCatetory(id);
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'sticky',
        top: 80,
        padding: '16px 16px 16px 100px',
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
    </Box>
  );
}

function getArticleType(pathname: string): string | null {
  if (pathname.search('post') > 0) return 'post';
  else if (pathname.search('note') > 0) return 'note';
  else return null;
}
