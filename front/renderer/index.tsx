import { marked } from 'marked';
import { codeblock } from './codeBlock';

const renderer = new marked.Renderer();

renderer.code = (code: string, lang: string): string => codeblock(code, lang);

export default renderer;
