import ArticlesList from '../../../components/ArticlesList';
import Header from '../../../components/Header';
import Layout from '../../../components/Layout';

export default function Post() {
  return (
    <>
      <Layout center={<ArticlesList type="note" />} />
    </>
  );
}
