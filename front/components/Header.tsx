import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { throttle } from 'lodash';

import s from '../styles/Header.module.scss';

export default function Header() {
  const pathname = useRouter().pathname.split('?')[0];
  const [scrollGuage, setScrollGuage] = useState<number>(0);

  const scrollHandler = useCallback(
    throttle(() => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;

      setScrollGuage(scrolled);
    }, 50),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <header className={s.header}>
      <nav className={s.menus}>
        {navMenu.map((menu) => (
          <li
            key={menu.name}
            className={`${
              pathname === `/${menu.route.split('?')[0]}` ? s.active : ''
            } 
              ${s.menu}`}
          >
            <Link href={`/${menu.route}`}>
              <a>{menu.name}</a>
            </Link>
          </li>
        ))}
      </nav>
      <div className={s.gauge__bar}>
        <div
          className={s.scroll__gauge}
          style={{ width: `${scrollGuage}%` }}
        ></div>
      </div>
    </header>
  );
}

const navMenu = [
  {
    name: 'HOME',
    route: '',
  },
  {
    name: 'POST',
    route: 'post?category=all',
  },
  {
    name: 'NOTE',
    route: 'note?category=all',
  },
  {
    name: 'RESUME',
    route: 'resume',
  },
];
