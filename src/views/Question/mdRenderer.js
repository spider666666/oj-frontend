import { marked } from 'marked';
import hljs from 'highlight.js';
// 引入highlight.js的样式（可根据需求选择其他样式）
import 'highlight.js/styles/monokai-sublime.css';

// 配置marked，启用代码高亮
marked.setOptions({
  highlight: (code, lang) => {
    // 如果指定了语言且highlight.js支持该语言，则高亮
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    // 未指定语言或不支持时，默认高亮
    return hljs.highlightAuto(code).value;
  },
  breaks: true, // 换行符转换为<br>
  gfm: true, // 启用GitHub风格的Markdown
});

/**
 * 将Markdown字符串解析为HTML字符串
 * @param {string} mdStr - Markdown格式的字符串
 * @returns {string} 解析后的HTML字符串
 */
export const renderMdToHtml = (mdStr) => {
  if (!mdStr) return '';
  return marked.parse(mdStr);
};