import { ColumnBlock, Block as BlockType } from '../../../types/notion_api_types';
import Block from '../../Block';

interface ColumnProps {
  block: ColumnBlock;
}

const Column: React.FC<ColumnProps> = ({ block }: ColumnProps) => {
  return (
    <div className={`Column depth_${block.depth}`}>
      {block.children && block.children.map((child: BlockType) => <Block key={child.id} block={child} />)}
    </div>
  );
};

export default Column;
