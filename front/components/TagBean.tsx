import React from 'react';
import s from '../styles/TagBean.module.scss';

export default function TagBean({ children }: Props) {
  return <div className={s.bean}>{children}</div>;
}

interface Props {
  children: React.ReactNode;
}
