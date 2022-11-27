import { Block } from '../types/notion_api_types';

import Wrapper from './Wrapper';
import BulletedListItem from './blocks/BulletedListItem';
import Callout from './blocks/Callout';
import Heading from './blocks/Heading';
import Paragraph from './blocks/Paragraph';
import Quote from './blocks/Quote';
import NumberedListItem from './blocks/NumberedListItem';
import Toggle from './blocks/Toggle';
import Code from './blocks/Code';
import ChildPage from './blocks/ChildPage';
import ToDo from './blocks/ToDo';
import NotionImage from './blocks/NotionImage';
import Bookmark from './blocks/Bookmark';
import ColumnList from './blocks/column_list/ColumnList';
import Column from './blocks/column_list/Column';
import Table from './blocks/table/Table';
import TableRow from './blocks/table/TableRow';

interface BlockProps {
  block: Block;
}

const Block: React.FC<BlockProps> = ({ block }: BlockProps) => {
  switch (block.type) {
    case 'paragraph':
      return <Paragraph block={block} />;
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      return <Heading block={block} />;
    case 'callout':
      return <Callout block={block} />;
    case 'quote':
      return <Quote block={block} />;
    case 'bulleted_list_item':
      return <BulletedListItem block={block} />;
    case 'numbered_list_item':
      return <NumberedListItem block={block} />;
    case 'to_do':
      return <ToDo block={block} />;
    case 'toggle':
      return <Toggle block={block} />;
    case 'code':
      return <Code block={block} />;
    case 'child_page':
      return <ChildPage block={block} />;
    case 'image':
      return <NotionImage block={block} />;
    case 'bookmark':
      return <Bookmark block={block} />;
    case 'column_list':
      return <ColumnList block={block} />;
    case 'column':
      return <Column block={block} />;
    case 'table':
      return <Table block={block} />;
    case 'table_row':
      return <TableRow block={block} />;
    default:
      return <div>{block.type} 지원 안함</div>;
  }
};

export default Block;
