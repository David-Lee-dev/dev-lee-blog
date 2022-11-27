import Link from 'next/link';
import { ChildPageBlock } from '../../types/notion_api_types';

interface ChildPageProps {
  block: ChildPageBlock;
}

const ChildPage: React.FC<ChildPageProps> = ({ block }: ChildPageProps) => {
  return (
    <>
      <Link href={`/page/${block.id}`}>{block.child_page.title}</Link>
    </>
  );
};

export default ChildPage;
