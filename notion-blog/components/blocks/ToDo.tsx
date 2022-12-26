import { ToDoBlock } from '../../types/notion_api_types';
import RichTexts from '../RichTexts';
import s from '../../styles/input.module.scss';

interface ToDoProps {
  block: ToDoBlock;
}

const ToDo: React.FC<ToDoProps> = ({ block }: ToDoProps) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={block.to_do.checked}
        className={`depth_${block.depth}`}
        disabled
      />
      <RichTexts richTexts={block.to_do.rich_text} />
    </div>
  );
};

export default ToDo;
