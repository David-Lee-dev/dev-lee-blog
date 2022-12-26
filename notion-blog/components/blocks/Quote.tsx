import { QuoteBlock, Block as BlockType } from '../../types/notion_api_types';
import Block from '../Block';
import RichTexts from '../RichTexts';

interface QuoteProps {
  block: QuoteBlock;
}

const Quote: React.FC<QuoteProps> = ({ block }: QuoteProps) => {
  return (
    <>
      <div
        className={`depth_${block.depth} flex`}
        style={{ width: '100%', wordBreak: 'break-all' }}
      >
        <div className="bg-gray-400 mr-2" style={{ minWidth: 4 }}></div>
        <div>
          <div className="py-1">
            <RichTexts richTexts={block.quote.rich_text} />
          </div>
          {block.children &&
            block.children.map((child: BlockType) => (
              <Block key={child.id} block={child} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Quote;
