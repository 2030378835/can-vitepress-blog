---
  title: 快速上手
  date: 2024-12-14
  tags: [开始]
  outline: 
    level: [2, 2]
    label: '页面导航'
---
>[!tip]虽然 CAN BLOG 比原始vitepress 更简单，但是仍然需要一些基本的vitepress 知识 。
>你可以通过 [vitepress官方文档](https://vitepress.dev/zh/guide/getting-started) 学习更多关于 VitePress 的知识。
## 在线尝试
可以直接在 [StackBlitz](https://vitepress.new) 上进行在线尝试vitepress的基本使用。

## 安装
### 安装前置准备
- [Node.js](https://nodejs.org/en/download/) (18.0.0+)
- [Git](https://git-scm.com/downloads)
- [pnpm](https://pnpm.io/zh/)
::: code-group
```bash [https]
git clone https://github.com/2030378835/can-vitepress-blog-user.git
```
```bash [ssh]
git clone git@github.com:2030378835/can-vitepress-blog-user.git
```
:::
### 默认配置
::: code-group
```ts [vitepress.config.ts]
// vitepress.config.ts
const defaultConfig = {
  docsBaseDir: '/docs/pages/docs/', // 文档根目录
  docsKindDir: [], // 文档类型，不建议手动写入；建议在写作页面中选择的第一个标签，然后自动生成。
  docsImageDir: '/docsImage', // 图片目录
  defaultAuther: 'qiangcan',
  blogTitle: 'CAN BLOG',
  blogDescription: 'can blog',
  blogLogo: '/logo.png',
  base: ''     
};

module.exports = defaultConfig;
```
:::

>[!danger] 注意💡
>`defaultConfig.base` 配置项是必须的，否则在本地预览时，会出现 404 错误，默认为空字符。

### 许多配置文件中均需要引入 defaultConfig 中的配置项
::: code-group
```ts [router/index.ts] {4,5,9,21}
// 根据pages文件夹自动生成路由，使用vue工程化
// https://vitepress-sidebar.cdget.com/zhHans/
import { withSidebar } from 'vitepress-sidebar';
const defaultConfig = require('../../vitepress.config')
const documentRootPathArr = defaultConfig.docsBaseDir.split('/'); //
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
...
```

```ts [.vitepress/config.mts]
// https://vitepress.dev/reference/site-config
const defaultConfig = require('../../vitepress.config')

const vitePressOptions = {
  title: defaultConfig.blogTitle,
  description: defaultConfig.blogDescription,
  ...
}
...
```

```ts [.vitepress/theme/post.data.mts]
import { createContentLoader } from 'vitepress'
const defaultConfig = require('../../../vitepress.config')

const createContentLoaderDirArr = defaultConfig.docsBaseDir.split('/');
createContentLoaderDirArr.shift();
createContentLoaderDirArr.shift();

const createContentLoaderDir = createContentLoaderDirArr.join('/');
...
```
:::
以及 `server/index.js`

## 文件结构
以下文件结构只展示部分重要文件。
>[!tip] 📒 文件结构
>若一下文件结构不符合要求，请参考 [文件结构](/other) 进行修改。
```can-blog
  ├── docs
  │   ├── .vuepress
  │   │   ├── config.mjs
  │   │   └── theme // [!code focus]
  │   │     ├── style
  │   │     ├── template // [!code focus]
  │   │     ├── index.ts
  │   │     └── post.data.mst
  │   ├── components
  │   ├── pages
  │   │     ├── docs // [!code focus]
  │   │     ├── ...
  │   ├── public // [!code focus]
  │   └── router
  ├── server // [!code focus]
  │     ├── index.ts // [!code focus]
  ├── package.json
  └── .gitignore
```
### `/docs/pages/docs`
- 默认情况下 `/docs/pages/docs` 文件夹作为存放文档的根目录并与 `vitepress.config.ts` 中的 `docsBaseDir` 配置项保持一致。

- `/docs/pages/其他文件夹`作为其他页面的根目录，当然一般情况下文档的生成以及文档中图片的引用会同您在其他网站编写博客时操作一致（在写作页面进行），不推荐在docs中手动创建其他文件夹，因为 `/docs/pages/docs` 文件夹下的文件会自动生成标签`vitepress.config.ts中的docsKindDir`，而其他文件夹下的文件不会自动生成标签，因此您需要手动创建标签，这是一个繁琐的操作。

### `/server/index.js`
- `/server/index.js` 文件夹作为存放服务器的根目录。
>[!tip] 服务器功能
>参考 [服务器功能](/other) 了解更多服务器功能。

## 启动并运行
该工具还应该将以下 npm 脚本注入到 package.json 中：
::: code-group
```json [package.json]
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  ...
}
:::
`docs:dev` 脚本将启动具有即时热更新的本地开发服务器。使用以下命令运行它：

::: code-group

```bash [npm]
$ npm run docs:dev
```

```bash [pnpm]
$ pnpm run docs:dev
```

```bash [yarn]
$ yarn docs:dev
```

```bash [bun]
$ bun run docs:dev
```
:::

更多的命令行用法请参见[CLI参考](https://vitepress.dev/zh/reference/cli)
开发服务应该会运行在 `http://localhost:5173` 上。在浏览器中访问 URL 以查看新站点的运行情况吧！

## 下一步

- 想要进一步了解 Markdown 文件是怎么映射到对应的 HTML，请继续阅读[vitepress路由指南](https://vitepress.dev/zh/guide/routing)。

- 要了解有关可以在页面上执行的操作的更多信息，例如编写 Markdown 内容或使用 Vue 组件，请参见指南的“编写”部分。一个很好的起点是了解[Markdown 扩展](https://vitepress.dev/zh/guide/markdown)。

- 要探索默认文档主题提供的功能，请查看[默认主题配置参考](https://vitepress.dev/zh/reference/default-theme-config)。

- 如果想进一步自定义站点的外观，参见[扩展默认主题](https://vitepress.dev/zh/guide/extending-default-theme)或者[构建自定义主题](https://vitepress.dev/zh/guide/custom-theme)。

- 文档成形以后，务必阅读[部署指南](https://vitepress.dev/zh/guide/deploy)。
