import Link from 'next/link';
import { ChildPageBlock } from '../../types/notion_api_types';

interface ChildPageProps {
  block: ChildPageBlock;
}

const ChildPage: React.FC<ChildPageProps> = ({ block }: ChildPageProps) => {
  return (
    <div className={`depth_${block.depth}`}>
      <Link href={`/page/${block.id}`}>
        <div className="w-4 inline-block">
          <svg viewBox="0 0 30 30" className="page">
            <path d="M16,1H4v28h22V11L16,1z M16,3.828L23.172,11H16V3.828z M24,27H6V3h8v10h10V27z M8,17h14v-2H8V17z M8,21h14v-2H8V21z M8,25h14v-2H8V25z"></path>
          </svg>
        </div>
        <span className="underline ml-1 hover:text-amber-600 text-gray-500">{block.child_page.title}</span>
      </Link>
    </div>
  );
};

export default ChildPage;
