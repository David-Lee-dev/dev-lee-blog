import Image from 'next/image';
import Link from 'next/link';
import { ChildPageBlock, DefaultEmoji } from '../../types/notion_api_types';

interface ChildPageProps {
  block: ChildPageBlock;
}

const ChildPage: React.FC<ChildPageProps> = ({ block }: ChildPageProps) => {
  return (
    <div className={`depth_${block.depth} pb-1`}>
      <Link href={`/page/${block.id}`} className="inline-block inline-flex">
        {block.icon === null ? (
          <div className="w-5">
            <svg viewBox="0 0 30 30">
              <path d="M16,1H4v28h22V11L16,1z M16,3.828L23.172,11H16V3.828z M24,27H6V3h8v10h10V27z M8,17h14v-2H8V17z M8,21h14v-2H8V21z M8,25h14v-2H8V25z"></path>
            </svg>
          </div>
        ) : (
          <>
            {block.icon.type === 'emoji' && <span>{block.icon.emoji}</span>}
            {block.icon.type === 'file' && (
              <div className="flex justify-center items-center">
                <Image src={block.icon.file.url} width={20} height={20} alt="icon" />
              </div>
            )}
          </>
        )}
        <span className="underline ml-1 hover:text-amber-600 text-gray-500">{block.child_page.title}</span>
      </Link>
    </div>
  );
};

export default ChildPage;
