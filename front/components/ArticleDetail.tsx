import { marked } from 'marked';
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import s from '../styles/ArticleDetail.module.scss';

const renderer = new marked.Renderer();

marked.use({
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  headerIds: false,
  renderer,
});

export default function ArticleDetail({ article }: Props) {
  const contents = article ? marked.parse(article) : '';

  useEffect(() => {
    Prism.highlightAll();
  }, [article]);

  return (
    <article>
      <div
        className={s.contents}
        dangerouslySetInnerHTML={{ __html: contents }}
        style={{ paddingTop: '30px' }}
      ></div>
    </article>
  );
}

interface Props {
  article: string;
}

const test = JSON.stringify('');
