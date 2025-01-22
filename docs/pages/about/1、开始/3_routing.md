---
  title: 路由配置
  date: 2024-12-14
  tags: [开始]
  outline: 
    level: [2, 2]
    label: '页面导航'
---
<script setup>
  import ActionComVue from '../../../components/action/index.vue'
</script>
>[!IMPORTANT] 💡 基本参考
>提示：CAN BLOG路由配置基于vitepress路由配置规则，详情请查看：<a href="https://vitepress.dev/zh/guide/routing" target="_blank">vitepress路由</a>；一般情况下不做复杂操作时可跳过`vitepress路由`学习。

## vitepress-sidebar

项目默认内置 `vitepress-sidebar` 插件，用于生成侧边栏配置文件。而路由的配置由 `/docs/router/index.ts` 完成。
::: code-group
```ts [/docs/router/index.ts]
import { withSidebar } from 'vitepress-sidebar';

// 多侧边栏配置
const vitePressSidebarOptions = [{ // [!code focus]
  documentRootPath: '/docs/pages/',
  scanStartPath: 'about',
  resolvePath: '/pages/about/',
  useTitleFromFrontmatter: true,
  useTitleFromFileHeading: true,
}]
/**
 * @param options 侧边配置
 * @returns 
 */
const getSidebar = (options = {}) : any => {  
  const sidebar = withSidebar(options, vitePressSidebarOptions); // [!code focus]
  return sidebar;
};
```

```ts [/docs/.vitepress/config.mts']
import { defineConfig } from 'vitepress'
import { getSidebar } from '../router'; // [!code focus]

const vitePressOptions = {
  /**其他配置项 */
}
export default defineConfig(getSidebar(vitePressOptions)); // [!code focus]
```
:::

## 路由配置
<ActionComVue type="success">
  💡注意：项目默认采用多侧边栏配置
</ActionComVue>

### vitePressSidebarOptions
>[!TIP] 1. vitePressSidebarOptions 
>```ts
>export interface vitePressSidebarType = {
>  // 文档根路径    
>  documentRootPath: string
>  scanStartPath: string
>  resolvePath: string
>  useTitleFromFrontmatter: boolean
>  useTitleFromFileHeading: boolean
>}  
>export interface vitePressSidebarOptionsType = vitePressSidebarType[]
>```

- `documentRootPath`文档文件所在的顶级路径。默认值为 `/`。这是 `.vitepress目录`所在的路径，如果项目根目录中文档所在的文件夹是 `/docs`，则该选项的值应设为 `docs` 或 `/docs`。

- `scanStartPath`此选项用于配置多个侧边栏。您可以在 多个侧边栏 页面上了解更多信息。用于扫描文档列表的根目录路径。
在`documentRootPath`中设置的路径中的文件,在`scanStartPath中`设置的路径之外,不会被扫描。
如果您指定了`scanStartPath`,建议您也设置`documentRootPath`,因为`documentRootPath`中设置的父路径应该出现在link中。
例如,如果根路径是`/docs`,要扫描的文件是`/docs/sub-dir/scan-me`,则设置如下`:documentRootPath: /docs,scanStartPath: sub-dir/scan-me (请勿包含 documentRootPath 的路径。)`

- `resolvePath`此选项用于配置多个侧边栏。您可以在 多个侧边栏 页面上了解更多信息。
输入路径,为每个路径显示不同的侧边栏。路径前必须包含/。没有此值的选项将设置为根路径`(/)`。
例如: `/`, `/path/sub-path`, `/guide/`...

### vitePressOptions
>[!TIP] 2. vitePressOptions
>详细配置请查看：[默认主题配置](https://vitepress.dev/zh/reference/default-theme-config)

## 单页面侧边栏

<ActionComVue type="danger">
  💡注意：该功能暂时废弃
</ActionComVue>

```ts
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
```
>[!IMPORTANT] items
>```ts
>interface SidebarItem {
>  link: string
>  items?: SidebarItem[]
>}

<ActionComVue type="info">
  💡注意：更多配置请查看：<a href="https://vitepress-sidebar.cdget.com/zhHans/guide/getting-started" target="_blank">VitePress Sidebar使用</a>
</ActionComVue>



