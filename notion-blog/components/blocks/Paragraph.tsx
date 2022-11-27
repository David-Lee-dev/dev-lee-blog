import { useCallback } from 'react';
import { RichText as RichTextType, ParagraphBlock, Block as BlockType } from '../../types/notion_api_types';
import Block from '../Block';
import RichTexts from '../RichTexts';

interface ParagraphProps {
  block: ParagraphBlock;
}

const Paragraph: React.FC<ParagraphProps> = ({ block }: ParagraphProps) => {
  const checkHaveRichTextsOrNot = useCallback((richTexts: RichTextType[]) => richTexts.length > 0, []);

  return (
    <div className={`depth_${block.depth} break-all`}>
      {checkHaveRichTextsOrNot(block.paragraph.rich_text) ? (
        <>
          <RichTexts richTexts={block.paragraph.rich_text} />
        </>
      ) : (
        <br />
      )}
      {block.children && block.children.map((child: BlockType) => <Block key={child.id} block={child} />)}
    </div>
  );
};

export default Paragraph;
