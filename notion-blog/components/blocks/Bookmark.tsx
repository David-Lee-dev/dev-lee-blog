import Link from 'next/link';
import { BookmarkBlock } from '../../types/notion_api_types';

interface BookmarkProps {
  block: BookmarkBlock;
}

const Bookmark: React.FC<BookmarkProps> = ({ block }: BookmarkProps) => {
  return (
    <div>
      <Link target="_blank" href={block.bookmark.url}>
        {block.bookmark.url}
      </Link>
      <ul>
        <li>
          <ul></ul>
        </li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default Bookmark;
