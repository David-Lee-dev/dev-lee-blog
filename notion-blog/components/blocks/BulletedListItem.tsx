import { BulletedListItemBlock, Block as BlockType } from '../../types/notion_api_types';
import Block from '../Block';
import RichTexts from '../RichTexts';

interface BulletedListItemProps {
  block: BulletedListItemBlock;
}

const BulletedListItem: React.FC<BulletedListItemProps> = ({ block }: BulletedListItemProps) => {
  return (
    <>
      <li className={`depth_${block.depth} unorder relative list-none`}>
        {listStyleBuidler(block.depth)}
        <RichTexts richTexts={block.bulleted_list_item.rich_text} />
      </li>
      {block.children && block.children.map((child: BlockType) => <Block key={child.id} block={child} />)}
    </>
  );
};

export default BulletedListItem;

const FilledCircleStype: React.FC = () => {
  return (
    <div className="absolute bg-black w-[6px] h-[6px] rounded-full top-1/2 -left-3 -translate-x-2/4 -translate-y-2/4"></div>
  );
};

const EmptyCricle: React.FC = () => {
  return (
    <div className="absolute border-solid border-[1px] border-black rounded-full w-[6.5px] h-[6.5px] top-1/2 -left-3 -translate-x-2/4 -translate-y-2/4"></div>
  );
};
const FilledSquare: React.FC = () => {
  return <div className="absolute bg-black w-[6px] h-[6px] top-1/2 -left-3 -translate-x-2/4 -translate-y-2/4"></div>;
};
const EmptyedSquare: React.FC = () => {
  return (
    <div className="absolute border-solid border-[1px] border-black w-[7px] h-[7px] top-1/2 -left-3 -translate-x-2/4 -translate-y-2/4"></div>
  );
};

function listStyleBuidler(depth: number) {
  switch (depth % 4) {
    case 1:
      return <EmptyCricle />;
    case 2:
      return <FilledSquare />;
    case 3:
      return <EmptyedSquare />;
    default:
      return <FilledCircleStype />;
  }
}
