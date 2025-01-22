---
  title: 主题配置
  date: 2025-01-18
  tags: [基础]
  outline: 
    level: [2, 2]
    label: '页面导航'
---
<script setup>
  import ActionComVue from '../../../components/action/index.vue'
  import { Image } from 'ant-design-vue'
</script>

>[!IMPORTANT] 💡 主题配置
>推荐参考[vitepress默认主题配置](https://vitepress.dev/zh/reference/default-theme-config)

## 主题颜色配置
- 在`/docs/.vitepress/theme/style/var.css`中设置亮色喝暗色主题色
- 当有vitepress的样式变更时推荐在var.css中更改，并在index.css中引入
::: code-group
```css [var.css]
/** 侧边栏样式设置 */
.VPSidebarItem .item .text{
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出的文本 */
  text-overflow: ellipsis; /* 显示省略号 */
  max-width: 200px; /* 确保文本宽度不超过容器 */
  height: 22px;
  padding: 0px;
}
.VPSidebarItem .VPLink ,.VPSidebarItem .link ,.VPSidebarItem .link {
  height: 28px;
  line-height: 28px;
}
p {
  padding: 0px;
}
```
```css [index.css]
/* index.css */
@import "./var.css"; /* [!code focus] */
@import "./blur.css";
@import "./music.css";
@import "./home.css";
@import "./archive.css";
@import "./upload.css";

```
:::

## 自定布局模版
- 在`/docs/.vitepress/theme/template/`模版文件中新建模版即可
- `template`下的`模版文件名`称必须和根目录下的`md文件名称`一致  
- 在`/docs/.vitepress/theme/index.ts`入口文件中全局注册即可
::: code-group
```ts [/docs/.vitepress/theme/index.ts]
import HomeTemplate from './template/home.vue' 

export default {
  enhanceApp({ app, router, siteData }) {
    // 将封装好的vue组件全局注册即可使用
    const routes = app;

    app.component('HomeTemplate', HomeTemplate) 
  },
};
```

```Markdown [/docs/index.md]
---
# 主页
# https://vitepress.dev/reference/default-theme-home-page
layout: HomeTemplate
footer: false
---
```
:::

## 扩展默认主题
- 在`/docs/.vitepress/theme/layout/`中通过插槽的方式自定义默认布局模版
::: code-group
```vue [/docs/.vitepress/theme/layout/Layout.vue]
<!-- Layout.vue -->
<template>
  <Layout>
    <template #doc-before>
      <span
        style="
          font-size: 32px;
          font-weight: 600;
          line-height: 42px;
        "
      > {{ page.frontmatter.title }}</span><!-- 自定义 doc-before -->

    </template>
    <template #doc-after>
      <!-- your custom slot -->
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";

const { Layout } = DefaultTheme;
const { page } = useData();
</script>
```
:::
- 在/docs/.vitepress/theme/index.ts`中全局注册即可
::: code-group
```ts [/docs/.vitepress/theme/index.ts]
// 引入antd文件
import MusicTemplate from './template/music.vue'
import HomeTemplate from './template/home.vue'

import MyLayout from './layout/index.vue' // 引入自定义布局 // [!code focus]

import "./style/index.css"; //引入自定义的样式

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 将封装好的vue组件全局注册即可使用
    const routes = app;
    app.component('HomeTemplate', HomeTemplate)
    app.component('MusicTemplate', MusicTemplate)
  },
  Layout: MyLayout // [!code focus]
};
```
:::

### 布局插槽
默认主题的 `<Layout/>` 组件有一些插槽，能够被用来在页面的特定位置注入内容。
默认主题布局的全部可用插槽如下：

- 当 `layout: 'doc'` (默认) 在 frontmatter 中被启用时：
  - `doc-top`
  - `doc-bottom`
  - `doc-footer-before`
  - `doc-before`
  - ...
- 当 `layout: 'home'` 在 frontmatter 中被启用时:
  - `home-hero-before`
  - `home-hero-info-before`
  - `home-hero-info`
  - `home-hero-info-after`
  - ...
- 当 `layout: 'page'` 在 frontmatter 中被启用时:
  - `page-top`
  - `page-bottom`
- `当未找到页面 (404) 时:`
  - `not-found`
- 总是启用:
  - `layout-top`
  - `layout-bottom`
  - ...

<ActionComVue type="success">
提示 🔔：更多插槽详情请查看  <a href="https://vitepress.dev/zh/guide/extending-default-theme#layout-slots" target="_blank">vitepress官方文档</a>
</ActionComVue>



