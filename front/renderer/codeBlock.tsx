import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-cmake';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-yaml';

export const codeblock = (code: string, lang: string): string => {
  const langClass = 'language-' + lang;

  const line = code
    .split('\n')
    .map(
      (item, index) => `
<tr data-line=${index + 1}>
<td class="line-number" data-number="${index + 1}">${index + 1}</td>
<td class="line-code" data-number=${index + 1}>${Prism.highlight(
        item,
        Prism.languages[lang],
        lang
      )}</td>
</tr>`
    )
    .join('\n')
    .replace(/\t|\\n/, '');

  return `
<div class="codeblock">
<div class="top">
<p>${lang.toUpperCase()}</p>
<div class="cells">
<div></div>
<div></div>
<div></div>
</div>
</div>
<pre class = "${langClass}">
<table>
<tbody>${line}</tbody>
</table>
</pre>
</div>
`;
};
