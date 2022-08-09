import { useEffect, useState } from 'react';
import { getCategoryListApi } from '../api/requests';
import Image from 'next/image';
import { Category } from '../types';
import s from '../styles/SideMenu.module.scss';

export default function SideMenu({ type }: Props) {
  const [category, setCategory] = useState<Category[]>([]);
  const [openCategory, setOpenCategory] = useState<boolean>(false);

  const sideMenuHandler = () => {
    setOpenCategory((prev) => !prev);
  };

  useEffect(() => {}, []);

  return (
    <aside className={`${s.side__menu} ${openCategory ? 'open' : s.close}`}>
      <ul>
        {category.map((c, i) => (
          <li className={s.sell} key={i}>
            <span>{c.name}</span>
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
  type: string;
}
