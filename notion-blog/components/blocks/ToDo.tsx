import { ToDoBlock } from '../../types/notion_api_types';
import RichTexts from '../RichTexts';

interface ToDoProps {
  block: ToDoBlock;
}

const ToDo: React.FC<ToDoProps> = ({ block }: ToDoProps) => {
  return (
    <>
      <input
        type="checkbox"
        checked={block.to_do.checked}
        className={`depth_${block.depth} checked:bg-blue-500`}
        style={{ display: 'inline' }}
        disabled
      />
      <RichTexts richTexts={block.to_do.rich_text} />
    </>
  );
};

export default ToDo;
