import { BulletedListItemBlock, Block as BlockType } from '../../types/notion_api_types';
import Block from '../Block';
import RichTexts from '../RichTexts';

interface BulletedListItemProps {
  block: BulletedListItemBlock;
}

const BulletedListItem: React.FC<BulletedListItemProps> = ({ block }: BulletedListItemProps) => {
  return (
    <>
      <li className={`depth_${block.depth}`}>
        <RichTexts richTexts={block.bulleted_list_item.rich_text} />
      </li>
      {block.children && block.children.map((child: BlockType) => <Block key={child.id} block={child} />)}
    </>
  );
};

export default BulletedListItem;
