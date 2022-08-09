import { Article } from '../types';
import s from '../styles/ArticlePreview.module.scss';
import TagBean from './TagBean';

export default function ArticlePreview({ article }: Props) {
  const tags = article.tags.split(' ');

  return (
    <article className={s.article__preview} key={article.id}>
      <h1 className={s.title}>{article.title}</h1>
      <div className={s.bottom}>
        <div className={s.tags}>
          {tags.map((tag, idx) => (
            <TagBean key={`${idx}--${tag}`}>{tag}</TagBean>
          ))}
        </div>
        <span className={s.created__date}>{article.created_at}</span>
      </div>
    </article>
  );
}

interface Props {
  article: Article;
}
