import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Category } from '../types';
import s from '../styles/SideMenu.module.scss';
import { articleContext } from '../contexts/ArticleListContext';
import { getArticleListApi } from '../api/requests';
import { categoryContext } from '../contexts/CategoryContext';

export default function SideMenu({ category }: Props) {
  const type = getArticleType();
  const [openCategory, setOpenCategory] = useState<boolean>(false);

  const { updateArticle } = useContext(articleContext);
  const { selected, changeSelectedCatetory } = useContext(categoryContext);

  const sideMenuHandler = () => setOpenCategory((prev) => !prev);
  const selectedHandler = async (id: number, name: string) => {
    if (type) updateArticle(await getArticleListApi(type, name, 1));
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

interface Props {
  category: Category[];
}

function getArticleType(): string | null {
  const pathname = window.location.pathname;
  if (pathname.search('post') > 0) return 'post';
  else if (pathname.search('note') > 0) return 'note';
  else return null;
}
