import { useContext, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import s from '../styles/SideMenu.module.scss';
import { articleContext } from '../contexts/ArticleListContext';
import { getArticleListApi } from '../api/requests';
import { categoryContext } from '../contexts/CategoryContext';
import { useRouter } from 'next/router';

export default function SideMenu() {
  const pathname = useRouter().pathname;

  const type = useMemo(() => getArticleType(pathname), []);
  const [openCategory, setOpenCategory] = useState<boolean>(false);

  const { updateArticle, updatePages } = useContext(articleContext);
  const { category, selected, changeSelectedCatetory } =
    useContext(categoryContext);

  const sideMenuHandler = () => setOpenCategory((prev) => !prev);
  const selectedHandler = async (id: number, name: string) => {
    if (type) {
      const response = await getArticleListApi(type, name, 1);
      updateArticle(response.articles);
      updatePages(response.cnt);
    }
    changeSelectedCatetory(id);
  };

  return (
    <aside className={`${s.side__menu} ${openCategory ? 'open' : s.close}`}>
      <ul>
        {category.map((c) => (
          <li
            className={s.sell}
            key={c.id}
            onClick={() => selectedHandler(c.id, c.name)}
          >
            <Link href={`/article/${type}`}>
              <a>
                <span className={c.id === selected ? s.active : ''}>
                  {c.name}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <button
        className={`${s.button} ${openCategory ? '' : s.rotate}`}
        onClick={sideMenuHandler}
      >
        <Image src="/fast-forward.png" width="32px" height="32px"></Image>
      </button>
    </aside>
  );
}

function getArticleType(pathname: string): string | null {
  if (pathname.search('post') > 0) return 'post';
  else if (pathname.search('note') > 0) return 'note';
  else return null;
}
