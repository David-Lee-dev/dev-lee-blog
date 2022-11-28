import { CellOfTableType } from '../../../types/notion_api_types';

interface CellProps {
  cell: CellOfTableType[];
}

const Cell: React.FC<CellProps> = ({ cell }: CellProps) => {
  return (
    <td>
      {cell.map((el, index) => (
        <span key={index}>{el.text.content}</span>
      ))}
    </td>
  );
};

export default Cell;
