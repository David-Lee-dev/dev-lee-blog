import React from 'react';
import { HeadingOneBlock, HeadingThreeBlock, HeadingTwoBlock, Block as BlockType } from '../../types/notion_api_types';
import Block from '../Block';
import RichTexts from '../RichTexts';

interface HeadingProps {
  block: HeadingOneBlock | HeadingTwoBlock | HeadingThreeBlock;
}

const Heading: React.FC<HeadingProps> = ({ block }: HeadingProps) => {
  let confirmedBlock = null;

  switch (block.type) {
    case 'heading_1':
      confirmedBlock = block as HeadingOneBlock;
      return (
        <h2 className={`depth_${block.depth}`}>
          <RichTexts richTexts={confirmedBlock.heading_1.rich_text} />
          {block.children && block.children.map((child: BlockType) => <Block key={child.id} block={child} />)}
        </h2>
      );
    case 'heading_2':
      confirmedBlock = block as HeadingTwoBlock;
      return (
        <h3 className={`depth_${block.depth}`}>
          <RichTexts richTexts={confirmedBlock.heading_2.rich_text} />
        </h3>
      );
    case 'heading_3':
      confirmedBlock = block as HeadingThreeBlock;
      return (
        <h4 className={`depth_${block.depth}`}>
          <RichTexts richTexts={confirmedBlock.heading_3.rich_text} />
        </h4>
      );
  }
};

export default Heading;
