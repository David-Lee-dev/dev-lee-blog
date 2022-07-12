import s from '../styles/Footer.module.scss';

export default function Footer() {
  return (
    <>
      <div className={s.footer}>
        <p className={s.copyright}>Copyright © 2022 Lee Ju Hyeon</p>
        <p>dev-lee</p>
      </div>
    </>
  );
}

const navMenu = [
  {
    name: 'HOME',
    route: 'home',
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
