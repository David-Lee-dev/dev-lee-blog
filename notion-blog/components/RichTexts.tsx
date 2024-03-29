import { RichText as RichTextType } from '../types/notion_api_types';
import RichText from './RichText';

interface RichTextsProps {
  richTexts: RichTextType[];
}

const RichTexts: React.FC<RichTextsProps> = ({ richTexts }: RichTextsProps) => {
  return (
    <p className="break-all inline-block">
      {richTexts.map((richText: RichTextType, index: number) => (
        <RichText key={index} richText={richText} />
      ))}
    </p>
  );
};

export default RichTexts;
