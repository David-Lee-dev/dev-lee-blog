import { useState } from 'react';
import { ToggleBlock, Block as BlockType } from '../../types/notion_api_types';
import Block from '../Block';
import RichTexts from '../RichTexts';

import s from '../../styles/triangle.module.scss';

interface ToggleProps {
  block: ToggleBlock;
}

const Toggle: React.FC<ToggleProps> = ({ block }: ToggleProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`depth_${block.depth} break-all inline`}>
      <div onClick={() => setOpen(!open)} className={`${s.triangle} ${open ? s.active : ''} cursor-pointer`}></div>
      <div className="inline ml-2">
        <RichTexts richTexts={block.toggle.rich_text} />
      </div>
      <div className={`${open ? '' : 'h-0 '}overflow-hidden`}>
        {block.children && block.children.map((child: BlockType) => <Block key={child.id} block={child} />)}
      </div>
    </div>
  );
};

export default Toggle;
