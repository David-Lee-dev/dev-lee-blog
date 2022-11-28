import { CellOfTableType, TableRowBlock } from '../../../types/notion_api_types';
import Cell from './Cell';

interface TableRowProps {
  block: TableRowBlock;
}

const TableRow: React.FC<TableRowProps> = ({ block }: TableRowProps) => {
  return (
    <tr className={`TableRow depth_${block.depth}`}>
      {block.table_row.cells &&
        block.table_row.cells.map((cell: CellOfTableType[], index: number) => (
          <Cell key={`${index}-${block.id}`} cell={cell} />
        ))}
    </tr>
  );
};

export default TableRow;
