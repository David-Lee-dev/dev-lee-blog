import { QuoteBlock } from '../../types/notion_api_types';
import RichTexts from '../RichTexts';

interface QuoteProps {
  block: QuoteBlock;
}

const Quote: React.FC<QuoteProps> = ({ block }: QuoteProps) => {
  return (
    <div className={`quote depth_${block.depth}`} style={{ width: '100%', wordBreak: 'break-all' }}>
      <RichTexts richTexts={block.quote.rich_text} />
    </div>
  );
};

export default Quote;
