import { useState } from 'react';
import Image from 'next/image';

import { Category } from '../types';
import s from '../styles/SideMenu.module.scss';

export default function SideMenu({ category }: Props) {
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(-1);

  const sideMenuHandler = () => setOpenCategory((prev) => !prev);
  const selectedHandler = (id: number) => setSelected(id);

  return (
    <aside className={`${s.side__menu} ${openCategory ? 'open' : s.close}`}>
      <ul>
        {category.map((c) => (
          <li
            className={s.sell}
            key={c.id}
            onClick={() => selectedHandler(c.id)}
          >
            <span className={c.id === selected ? s.active : ''}>{c.name}</span>
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
