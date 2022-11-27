import { ColumnListBlock, Block as BlockType } from '../../../types/notion_api_types';
import Block from '../../Block';

interface ColumnListProps {
  block: ColumnListBlock;
}

const ColumnList: React.FC<ColumnListProps> = ({ block }: ColumnListProps) => {
  return (
    <div className={`columnList grid gap-1 grid-rows-1 ${getGridColumn(block.children?.length)}`}>
      {block.children &&
        block.children.map((child: BlockType) => (
          <div className="col-span-1" key={child.id}>
            <Block block={child} />
          </div>
        ))}
    </div>
  );
};

export default ColumnList;

function getGridColumn(columns: number | undefined) {
  return columns ? `grid-cols-${columns}` : 'grid-cols-2';
}
