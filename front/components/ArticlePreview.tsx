import { Article } from '../types';
import s from '../styles/ArticlePreview.module.scss';
import TagBean from './TagBean';
import Link from 'next/link';
import { categoryContext } from '../contexts/CategoryContext';
import { useContext } from 'react';

export default function ArticlePreview({ article }: Props) {
  const tags = article.tags.split(' ');
  const { changeSelectedCatetory } = useContext(categoryContext);

  return (
    <article className={s.article__preview} key={article.id}>
      <Link href={`/article/post/detail/${article.id}`}>
        <a onClick={() => changeSelectedCatetory(article.category.id)}>
          <h1 className={s.title}>{article.title}</h1>
          <div className={s.bottom}>
            <div className={s.tags}>
              {tags.map((tag, idx) => (
                <TagBean key={`${idx}--${tag}`}>{tag}</TagBean>
              ))}
            </div>
            <span className={s.created__date}>{article.created_at}</span>
          </div>
        </a>
      </Link>
    </article>
  );
}

interface Props {
  article: Article;
}
