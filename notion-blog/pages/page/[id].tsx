import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Block from '../../components/Block';
import { getAllBlocks, getPage } from '../../lib/notion';
import { Block as BlockType, Page as PageType } from '../../types/notion_api_types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page_id = context.query.id;

  const page = await getPage(page_id as string);
  const blocks = await getAllBlocks(page_id as string, 0);

  if (page && blocks) {
    return {
      props: {
        page,
        blocks,
      },
    };
  } else {
    return {
      props: {
        page: null,
        blocks: null,
      },
    };
  }
};

const PageByIdPage = ({ page, blocks }: { page: PageType; blocks: BlockType[] }) => {
  console.log(blocks);

  return (
    <>
      <Head>
        <title>I&apos;m dev-lee | {page.properties.title.title[0].plain_text}</title>
        <meta property="og:title" content={page.properties.title.title[0].plain_text} />
        <meta property="og:description" content="안녕하세요. 개발자 이주현입니다." />
        <meta property="og:url" content={`https://im-dev-lee.site/page/${page.id}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9fbb7d68-e4a0-4f87-811d-db268d46b58f/57592095.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221111T175236Z&X-Amz-Expires=86400&X-Amz-Signature=9d0e52a4386b9256a36e08bb09c1801934ec192eb346c1216bd3b3b935eae4a2&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%2257592095.png%22&x-id=GetObject"
        />
        <meta name="description" content="dev-lee's blog" />
        <link rel="icon" href="/favicon.ico" />
        <link href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css" rel="stylesheet" type="text/css"></link>
      </Head>
      <div className="grid gap-1 grid-cols-12 grid-rows-1 mx-auto">
        <div className="left col-span-1 lg:col-span-2 xl:col-span-3"></div>
        <div className="center col-span-10 lg:col-span-8 xl:col-span-6">
          <h1 className="py-5">{page.properties.title.title[0].plain_text}</h1>
          {blocks.map((block: BlockType) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
        <div className="right col-span-1 lg:col-span-2 xl:col-span-3"></div>
      </div>
    </>
  );
};

export default PageByIdPage;
