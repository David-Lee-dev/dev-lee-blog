import Image from 'next/image';
import Link from 'next/link';
import s from '../styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <p className={s.copyright}>Copyright © 2022 Lee Ju Hyeon</p>
      <a
        className={s.github}
        href="https://github.com/David-Lee-dev"
        target="_blank"
        rel="noreferrer"
      >
        <Image src="/github.png" width="20px" height="20px"></Image>
      </a>
    </footer>
  );
}
