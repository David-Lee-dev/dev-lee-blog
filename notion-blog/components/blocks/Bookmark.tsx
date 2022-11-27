import Image from 'next/image';
import Link from 'next/link';
import { BookmarkBlock } from '../../types/notion_api_types';

interface BookmarkProps {
  block: BookmarkBlock;
}

const Bookmark: React.FC<BookmarkProps> = ({ block }: BookmarkProps) => {
  return (
    <>
      <Link target="_blank" href={block.bookmark.url}>
        {block.bookmark.url}
      </Link>
    </>
  );
};

export default Bookmark;
