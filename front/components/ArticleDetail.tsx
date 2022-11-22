import { marked } from 'marked';
import 'prismjs/themes/prism-tomorrow.css';
import s from '../styles/ArticleDetail.module.scss';
import renderer from '../renderer';

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

  return (
    <article className="contents">
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
