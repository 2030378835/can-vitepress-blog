---
  title: 部署
  date: 2025-01-20
  tags: [开始]
---
<script setup>
  import ActionComVue from '../../../components/action/index.vue'
  import { Image } from 'ant-design-vue'
  import defaultConfigES from '../../../../vitepress.config.ES.ts'
</script>

## 前提条件
以下指南基于一些前提：
- VitePress 站点位于项目的 `docs` 目录中。
- 你使用的是默认的生成输出目录 （`.vitepress/dist`）。
- VitePress 作为本地依赖项安装在项目中，并且你已在 package.json 中设置以下脚本：
::: code-group
```json [package.json]
{
  "scripts": {
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```
:::
## 本地构建与测试
1. 你可以通过以下命令来构建输出文件`dist`
```bash
$ npm run docs:build
```

2. 构建文档后，通过运行以下命令可以在本地预览它：
```bash
$ npm run docs:preview
```
`preview` 命令将启动一个本地静态 Web 服务 http://localhost:4173，该服务以 `.vitepress/dist` 作为源文件。这是检查生产版本在本地环境中是否正常的一种简单方法。

3. 可以通过传递 `--port` 作为参数来配置服务器的端口。
```json
{
  "scripts": {
    "docs:preview": "vitepress preview docs --port 8080"
  }
}
```
现在 `docs:preview` 方法将会在 http://localhost:8080 启动服务。

## 设定public根目录
一般默认情况下的public根目录为(`/`)，倘若你要将项目部署到非根目录(`/`)下，我们将通过指定
- `vitepress.config.ts` 
- `vitepress.config.ES.ts`

的base配置项来指定public根目录。
>[!note]注意 ⛔️
>- 原 `vitepress` 是通过在`/docs/.vitepress/config.mts` 的配置项中配置base来指定public根目录的。
>- `can-vitepress-blog`是基于vitepress二开，故而我们将常用且常更改的配置单独创建文件进行配置。
> 
>::: code-group
>```ts [vitepress.config.ts]
>const defaultConfig = {
>   docsBaseDir: '/docs/pages/about/', // 文档根目录
>   docsKindDir: [], // 文档类型，不建议手动写入；建议在写作页面中选择的第一个标签，然后自动生成。
>   docsImageDir: '/docsImage', // 图片目录
>   defaultAuther: 'qiangcan',
>   blogTitle: 'CAN BLOG',
>   blogDescription: 'can blog',
>   blogLogo: '/logo/logo.png',   
>   base: '/can-vitepress-blog' // [!code focus] 
>};
>
>module.exports = defaultConfig;
>```
>```ts [vitepress.config.ES.ts]
>const defaultConfigES = {
>   docsBaseDir: '/docs/pages/about/', // 文档根目录
>   docsKindDir: ['1、开始'], // 文档类型，不建议手动写入；建议在写作页面中选择的第一个标签，然后自动生成。
>   docsImageDir: '/docsImage', // 图片目录
>   defaultAuther: 'qiangcan',
>   blogTitle: 'CAN BLOG',
>   blogDescription: 'can blog',
>   blogLogo: '/logo/logo.png',   
>   base: '/can-vitepress-blog' // [!code focus] 
>};
>
>export default defaultConfigES;
>```
>:::
>- 如果你使用的是 `Github（或 GitLab）`页面并部署到 `user.github.io/repo/`，请将 `base` 设置为 `/repo`(注意：vitepress官方文档是`/repo/`不要混淆)。

## HTTP 缓存标头
vitepress[HTTP 缓存标头](https://vitepress.dev/zh/guide/deploy#http-cache-headers)

## Github自动化部署

使用仪表板创建新项目并更改这些设置：

- 构建命令： `npm run docs:build`
- 输出目录： `docs/.vitepress/dist`
- node 版本： `18` (或更高版本)

>[!warning]
>不要为 HTML 代码启用 Auto Minify 等选项。它将从输出中删除对 Vue 有意义的注释。如果被删除，你可能会看到激活不匹配错误。

1. 在项目的 .github/workflows 目录中创建一个名为 deploy.yml 的文件，其中包含这样的内容
::: code-group
```yml [.github/workflows/deploy.yml]
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      # - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消此区域注释
      #   with:
      #     version: 9
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: npm run docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```
:::

>[!warning]
>确保 VitePress 中的 base 选项配置正确。有关更多详细信息，请参阅[设置根路径](/pages/about/1、开始/4_push.html#设定public根目录)。
2. 在存储库设置中的“Pages”菜单项下，选择“Build and deployment > Source > GitHub Actions”。
3. 将更改推送到 main 分支并等待 GitHub Action 工作流完成。你应该看到站点部署到 `https://<username>.github.io/[repository]/` 或 `https://<custom-domain>/`，这取决于你的设置。你的站点将在每次推送到 main 分支时自动部署。

## 更多平台部署指南

参考[vitepress部署](https://vitepress.dev/zh/guide/deploy#platform-guides)