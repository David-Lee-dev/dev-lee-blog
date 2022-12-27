import {
  TableBlock,
  Block as BlockType,
} from '../../../types/notion_api_types';
import Block from '../../Block';

import s from '../../../styles/table.module.scss';

interface TableProps {
  block: TableBlock;
}

const Table: React.FC<TableProps> = ({ block }: TableProps) => {
  return (
    <table
      className={`${s.table} ${
        block.table.has_row_header ? s.highlight__row : ''
      }${block.table.has_column_header ? s.highlight__col : ''} depth_${
        block.depth
      }`}
    >
      <tbody>
        {block.children &&
          block.children &&
          block.children.map((child: BlockType, index: number) => (
            <Block key={`${index}-${child.id}`} block={child} />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
