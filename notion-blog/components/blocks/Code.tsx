import { useEffect, useMemo } from 'react';
import { CodeBlock } from '../../types/notion_api_types';

import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-cmake';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-yaml';

import s from '../../styles/code.module.scss';
import 'prismjs/themes/prism-tomorrow.css';

interface CodeProps {
  block: CodeBlock;
}

const Code: React.FC<CodeProps> = ({ block }: CodeProps) => {
  const convertedCode = useMemo(() => {
    return block.code.rich_text[0].plain_text
      .split('\n')
      .map(
        (item: string, index: number) => `
<tr data-line=${index + 1}>
<td class="line-number" data-number="${index + 1}">${index + 1}</td>
<td class="line-code" data-number=${index + 1}>${Prism.highlight(
          item,
          Prism.languages[block.code.language],
          block.code.language
        )}</td>
</tr>`
      )
      .join('\n')
      .replace(/\t|\\n/, '');
  }, []);

  return (
    <div className={s.contents}>
      <div className={s.codeblock}>
        <div className={s.top}>
          <p>{block.code.language.toUpperCase()}</p>
          <div className={s.cells}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <pre className={`language-${block.code.language}`}>
          <table>
            <tbody dangerouslySetInnerHTML={{ __html: convertedCode }}></tbody>
          </table>
        </pre>
      </div>
    </div>
  );
};

export default Code;
