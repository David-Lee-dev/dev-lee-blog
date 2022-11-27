import { TableBlock, Block as BlockType } from '../../../types/notion_api_types';
import Block from '../../Block';

interface TableProps {
  block: TableBlock;
}

const Table: React.FC<TableProps> = ({ block }: TableProps) => {
  return (
    <table
      className={`Table ${block.table.has_row_header ? 'highlight__row' : ''}${
        block.table.has_column_header ? 'highlight__col' : ''
      } depth_${block.depth}`}
    >
      <tbody>
        {block.children &&
          block.children.map((child: BlockType, index: number) => <Block key={`${index}-${child.id}`} block={child} />)}
      </tbody>
    </table>
  );
};

export default Table;
