import { ToggleBlock, Block as BlockType } from '../../types/notion_api_types';
import Block from '../Block';
import RichTexts from '../RichTexts';

interface ToggleProps {
  block: ToggleBlock;
}

const Toggle: React.FC<ToggleProps> = ({ block }: ToggleProps) => {
  return (
    <div className={`toggle`}>
      <RichTexts richTexts={block.toggle.rich_text} />
      {block.children && block.children.map((child: BlockType) => <Block key={child.id} block={child} />)}
    </div>
  );
};

export default Toggle;
