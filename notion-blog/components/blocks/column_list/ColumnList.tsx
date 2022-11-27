import { ColumnListBlock, Block as BlockType } from '../../../types/notion_api_types';
import Block from '../../Block';

interface ColumnListProps {
  block: ColumnListBlock;
}

const ColumnList: React.FC<ColumnListProps> = ({ block }: ColumnListProps) => {
  return (
    <div className={`ColumnList depth_${block.depth}`}>
      {block.children && block.children.map((child: BlockType) => <Block key={child.id} block={child} />)}
    </div>
  );
};

export default ColumnList;
