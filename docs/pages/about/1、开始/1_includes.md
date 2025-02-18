---
  title: 简介
  date: 2024-12-14
  tags: [开始]
---
<script setup>
  import ActionComVue from '../../../components/action/index.vue'
  import { Image } from 'ant-design-vue'
  import defaultConfigES from '../../../../vitepress.config.ES.ts'
</script>

> [!TIP] ⚠️ 您正在阅读can-vitepress-blog使用文档！
> 有任何不懂的地方可在下方留言区进行交流

## 什么是CAN BLOG

`CAN BLOG`是基于vitepress二开的个人博客系统，他能够方便使用者快速构建自己的博客文章，无需繁琐的配置和复杂的代码编写。

`CAN BLOG`以[antdv](https://antdv.com/components/overview)为UI设计基础，简洁大方，界面友好；同时结合[VitePress Sidebar](https://vitepress-sidebar.cdget.com/zhHans/)自动化构建侧边栏（路由），无需使用者手动配置；以及构建[md-editor-v3](https://imzbf.github.io/md-editor-v3/)实现Markdown编辑器功能，`Node server`实现文章保存功能。

## 基本示例

- antdv使用时通过组件内引入
```vue 
<template>
  <Input v-model:value="value"/>
</template>

<script setup>
  import { Input } from 'ant-design-vue';
  import { ref } from 'vue'
  const value = ref('你好CAN BLOG')
</script>
  ```
- VitePress Sidebar配置
```js
// `.vitepress/config.js`
import { withSidebar } from 'vitepress-sidebar';

const vitePressOptions = {
  // VitePress's options here...
  title: 'VitePress Sidebar',
  themeConfig: {
    // ...
  }
};

const vitePressSidebarOptions = {
  // VitePress Sidebar's options here...
  documentRootPath: '/',
  collapsed: false,
  capitalizeFirst: true
};

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));
```

- md-editor-v3编辑器功能、Node server文章保存功能。
<Image style="border: 1px solid var(--vp-c-brand-1);border-radius:4px;" :src="defaultConfigES.base+'/docsImage/image.png'"/>
<ActionComVue type="warning">
🔔 提示：该功能只能用于开发环境的md文章编写，在打包上传时不推荐打包该功能。
</ActionComVue>
