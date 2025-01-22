// posts.data.js
import { createContentLoader } from 'vitepress'
const defaultConfig = require('../../../vitepress.config')

const createContentLoaderDirArr = defaultConfig.docsBaseDir.split('/');
createContentLoaderDirArr.shift();
createContentLoaderDirArr.shift();

const createContentLoaderDir = createContentLoaderDirArr.join('/');
console.log(createContentLoaderDir, 'createContentLoaderDir');
export default createContentLoader(`${createContentLoaderDir}/*/*.md`, {
  includeSrc: true, // 包含原始 markdown 源?
  render: true,     // 包含渲染的整页 HTML?
  excerpt: true,    // 包含摘录?
  transform(rawData) {
    // 根据需要对原始数据进行 map、sort 或 filter
    // 最终的结果是将发送给客户端的内容
    return rawData.sort((a, b) => {
      return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
    }).map((page) => {
      page.src     // 原始 markdown 源
      page.html    // 渲染的整页 HTML
      page.excerpt // 渲染的摘录 HTML（第一个 `---` 上面的内容）
      return {
        title: page.frontmatter.title,
        date: page.frontmatter.date,
        desc: page.frontmatter.description || page.excerpt,
        url: defaultConfig.base+page.url,
        tags: page.frontmatter.tags,
        cover: page.frontmatter.cover,
        author: page.frontmatter.author
      }
    })
  }
})