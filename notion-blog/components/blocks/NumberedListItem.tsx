import {
  NumberedListItemBlock,
  Block as BlockType,
} from '../../types/notion_api_types';
import Block from '../Block';
import RichTexts from '../RichTexts';

interface NumberedListItemProps {
  block: NumberedListItemBlock;
  level: number;
}

const NumberedListItem: React.FC<NumberedListItemProps> = ({
  block,
  level,
}: NumberedListItemProps) => {
  return (
    <>
      <li className={`depth_${block.depth} list-none`}>
        <RichTexts richTexts={block.numbered_list_item.rich_text} />
      </li>
      {block.children &&
        block.children.map((child: BlockType) => (
          <Block key={child.id} block={child} level={level + 1} />
        ))}
    </>
  );
};

export default NumberedListItem;
