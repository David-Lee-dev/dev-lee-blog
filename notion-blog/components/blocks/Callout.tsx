import { CalloutBlock } from '../../types/notion_api_types';
import RichTexts from '../RichTexts';

interface CalloutProps {
  block: CalloutBlock;
}

const Callout: React.FC<CalloutProps> = ({ block }: CalloutProps) => {
  return (
    <div className={`callout depth_${block.depth}`}>
      <div>{block.callout.icon.emoji}</div>
      <div>
        <RichTexts richTexts={block.callout.rich_text} />
      </div>
    </div>
  );
};

export default Callout;
