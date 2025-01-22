// 根据pages文件夹自动生成路由，使用vue工程化
// https://vitepress-sidebar.cdget.com/zhHans/
import { withSidebar } from 'vitepress-sidebar';
const defaultConfig = require('../../vitepress.config')
const documentRootPathArr = defaultConfig.docsBaseDir.split('/');
const scanStartPathRoot = documentRootPathArr.splice(3,1).join('/');
const documentRootPath = documentRootPathArr.join('/');

const resolvePathRootArr = defaultConfig.docsBaseDir.split('/');
resolvePathRootArr.splice(1,1)
const resolvePathRoot = resolvePathRootArr.join('/');

const routerConfig = {
  documentRootPath: documentRootPath,
  scanStartPathRoot: scanStartPathRoot,
  resolvePathRoot: resolvePathRoot,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true
};

const mdPathConfigArray = defaultConfig.docsKindDir;

const vitePressSidebarOptions = mdPathConfigArray.map(item => ({
  documentRootPath: routerConfig.documentRootPath, // https://vitepress-sidebar.cdget.com/zhHans/guide/options#documentrootpath
  scanStartPath: `${routerConfig.scanStartPathRoot}/${item}`, // https://vitepress-sidebar.cdget.com/zhHans/guide/options#scanstartpath
  resolvePath: `${routerConfig.resolvePathRoot}${item}/`, // https://vitepress-sidebar.cdget.com/zhHans/guide/options#resolvepath
  useTitleFromFrontmatter: true,
  useTitleFromFileHeading: true,
}));

const vitePressSidebarOptions2 = [
  {
    documentRootPath: '/docs/pages/',
    scanStartPath: 'about',
    resolvePath: '/pages/about/',
    useTitleFromFrontmatter: true,
    useTitleFromFileHeading: true,
  }
];

vitePressSidebarOptions.push(...vitePressSidebarOptions2);

/**
 * @param items 路由
 * @param prefix 需要添加的前缀
 * @returns 
 */
function addPrefixToLinks(items: any[], prefix: string): any[] {
  items.forEach(item => {
    if (item.link) {
      item.link = prefix + item.link;
    }
    if (item.items && Array.isArray(item.items)) {
      addPrefixToLinks(item.items, prefix);
    }
  });
  return items;
}

/**
 * @param options 侧边配置
 * @returns 
 */
const getSidebar = (options = {}) : any => {
  const sidebar = withSidebar(options, vitePressSidebarOptions);
  return sidebar;
};

export { getSidebar };