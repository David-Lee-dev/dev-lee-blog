import { CalloutBlock } from '../../types/notion_api_types';
import RichTexts from '../RichTexts';

interface CalloutProps {
  block: CalloutBlock;
}

const Callout: React.FC<CalloutProps> = ({ block }: CalloutProps) => {
  return (
    <div className={`depth_${block.depth} grid grid-cols-12 min-h-[50px] p-3 bg-zinc-400 rounded-lg`}>
      <div className="col-span-1 flex justify-center py-2">{block.callout.icon.emoji}</div>
      <div className="col-span-11 flex items-center pl-2">
        <RichTexts richTexts={block.callout.rich_text} />
      </div>
    </div>
  );
};

export default Callout;
