import { useMemo } from 'react';
import { RichText as RichTextType } from '../types/notion_api_types';

interface RichTextProps {
  richText: RichTextType;
}

const RichText: React.FC<RichTextProps> = ({ richText }: RichTextProps) => {
  const { bold, code, color, italic, strikethrough, underline } = useMemo(() => richText.annotations, []);

  return (
    <span className={propertiesBuilder(bold, code, color, italic, strikethrough, underline)}>
      {richText.text.content}
    </span>
  );
};

export default RichText;

function propertiesBuilder(
  bold: boolean,
  code: boolean,
  color: boolean,
  italic: boolean,
  strikethrough: boolean,
  underline: boolean
) {
  let result = '';

  result += bold ? 'bold ' : '';
  result += code ? 'code ' : '';
  result += color ? `color-${color} ` : '';
  result += italic ? 'italic ' : '';
  result += strikethrough ? 'strikethrough ' : '';
  result += underline ? 'underline ' : '';

  return result;
}
