import Link from 'next/link';
import { useMemo } from 'react';
import fontColorConverter from '../library/utils/colorConverter';
import { RichText as RichTextType } from '../types/notion_api_types';

interface RichTextProps {
  richText: RichTextType;
}

const RichText: React.FC<RichTextProps> = ({ richText }: RichTextProps) => {
  const { bold, code, color, italic, strikethrough, underline } = useMemo(
    () => richText.annotations,
    []
  );

  return (
    <>
      {richText.href !== null ? (
        <Link
          href={richText.href}
          target="_blank"
          className="hover:text-orange-400 underline text-gray-500 leading-[25px]"
        >
          {richText.text.content}
        </Link>
      ) : (
        <span
          className={`${propertiesBuilder(
            bold,
            code,
            color,
            italic,
            strikethrough,
            underline
          )}leading-[25px]`}
        >
          {richText.text.content}
        </span>
      )}
    </>
  );
};

export default RichText;

function propertiesBuilder(
  bold: boolean,
  code: boolean,
  color: string,
  italic: boolean,
  strikethrough: boolean,
  underline: boolean
) {
  let result = '';

  result += bold ? 'font-bold ' : '';
  result += code ? 'text-red-600 bg-gray-300 px-1 mx-1 rounded ' : '';
  result += color ? `${fontColorConverter(color)} ` : '';
  result += italic ? 'italic ' : '';
  result += strikethrough ? 'line-through ' : '';
  result += underline ? 'underline ' : '';

  return result;
}
