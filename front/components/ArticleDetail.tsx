import { marked } from 'marked';
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

import { Article } from '../types';
import s from '../styles/ArticleDetail.module.scss';

marked.use({
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  headerIds: false,
});

export default function ArticleDetail({ article }: Props) {
  const title = article.title ? article.title : '';
  const contentsUrl = article.contents_url ? article.contents_url : '';
  const tags = article.tags ? article.tags.split(' ') : '';
  const contents = article.contents ? marked.parse(article.contents) : '';

  useEffect(() => {
    (async () => await Prism.highlightAll())();
  }, [article]);

  return (
    <article>
      <div
        className={s.contents}
        dangerouslySetInnerHTML={{ __html: contents }}
        style={{ marginTop: '30px' }}
      ></div>
    </article>
  );
}

interface Props {
  article: Article;
}
