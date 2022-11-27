import { CodeBlock } from '../../types/notion_api_types';
import RichTexts from '../RichTexts';

interface CodeProps {
  block: CodeBlock;
}

const Code: React.FC<CodeProps> = ({ block }: CodeProps) => {
  return (
    <>
      <RichTexts richTexts={block.code.rich_text} />
    </>
  );
};

export default Code;
