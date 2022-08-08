import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { throttle } from 'lodash';

import s from '../styles/Header.module.scss';
import SideMenu from './SideMenu';

export default function Header() {
  const pathname = useRouter().pathname.split('?')[0];
  const [scrollGuage, setScrollGuage] = useState<number>(0);

  const scrollHandler = useCallback(
    throttle(() => {
      const totalHeight = window.innerHeight + 84;
      const calc = 100 - ((totalHeight - window.scrollY) / totalHeight) * 100;

      setScrollGuage(calc);
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
    <>
      <header className={s.nav}>
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
        {(pathname === '/blog' || pathname === '/note') && (
          <div style={{ position: 'absolute' }}>
            <SideMenu
              type={`${pathname === '/blog' ? 'post' : ''}${
                pathname === '/note' ? 'note' : ''
              }`}
            />
          </div>
        )}
      </header>
    </>
  );
}

const navMenu = [
  {
    name: 'HOME',
    route: '',
  },
  {
    name: 'BLOG',
    route: 'blog?category=all',
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
