import { NumberedListItemBlock, Block as BlockType } from '../../types/notion_api_types';
import Block from '../Block';
import RichTexts from '../RichTexts';

interface NumberedListItemProps {
  block: NumberedListItemBlock;
}

interface OlWrapper {
  children: React.ReactNode;
  flag: boolean;
}

const OlWrapper: React.FC<OlWrapper> = ({ children, flag }: OlWrapper) => {
  return flag ? <ol>{children}</ol> : <>{children}</>;
};

const NumberedListItem: React.FC<NumberedListItemProps> = ({ block }: NumberedListItemProps) => {
  return (
    <>
      <li className={`depth_${block.depth}`}>
        <RichTexts richTexts={block.numbered_list_item.rich_text} />
      </li>
      {block.children && block.children.map((child: BlockType) => <Block key={child.id} block={child} />)}
    </>
  );
};

export default NumberedListItem;
