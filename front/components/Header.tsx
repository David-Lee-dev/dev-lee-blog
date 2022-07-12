import Link from 'next/link';
import { useRouter } from 'next/router';
import s from '../styles/Header.module.scss';

export default function Header() {
  const route = useRouter();
  return (
    <>
      <div className={s.nav}>
        <div>
          <ul className={s.menus}>
            {navMenu.map((menu) => (
              <li
                key={menu.name}
                className={route.pathname === `/${menu.route}` ? s.active : ''}
              >
                <Link href={`/${menu.route}`}>
                  <a>{menu.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
    route: 'blog',
  },
  {
    name: 'NOTE',
    route: 'note',
  },
  {
    name: 'RESUME',
    route: 'resume',
  },
];
