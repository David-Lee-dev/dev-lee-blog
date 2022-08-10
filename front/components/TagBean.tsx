import React from 'react';

import s from '../styles/TagBean.module.scss';

export default function TagBean({ children }: Props) {
  return <span className={s.bean}>{children}</span>;
}

interface Props {
  children: React.ReactNode;
}
