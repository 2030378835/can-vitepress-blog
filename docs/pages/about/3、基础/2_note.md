---
  title: 评论实现
  date: 2025-01-18
  tags: [基础]
  outline: 
    level: [2, 2]
    label: '页面导航'
---
<script setup>
  import ActionComVue from '../../../components/action/index.vue'
  import { Image } from 'ant-design-vue'
  import defaultConfigES from '../../../../vitepress.config.ES.ts'

</script>

>[!tip] giscus 
>评论实现通过[giscus](https://giscus.app/zh-CN)

## 获取配置
1. `giscus`是通过`Github仓库`来管理评论内容的，因此我们需要在`Github`新建一个仓库，并将仓库设置为公开、且在`Setting -> Features -> Discussion` 开启评论功能

2. 进入[giscus官网](https://giscus.app/zh-CN)填写信息获取配置
<Image :src="defaultConfigES.base+'/docsImage/image5.png'" style="border: 1px solid var(--vp-c-brand-1);border-radius:4px;"/>

3. 下载[giscus的vue插件](https://ecosystem.vuejs.press/zh/plugins/blog/comment/giscus/)

4. 在`Layout.vue`中引入插件

::: code-group
```vue [Layout.vue]
<!-- Layout.vue -->
<template>
  <!-- ConfigProvider 用于andtv全局主题配置 -->
  <Layout>
    <template #doc-before>
      <span
        style="
          font-size: 32px;
          font-weight: 600;
          line-height: 42px;
        "
      > {{ page.frontmatter.title }}</span>
      <!-- <Image
        v-if="page.frontmatter.cover"
        :src="page.frontmatter.cover"
        style=" 
          height: 240px;
          width: 688px;
          object-fit: cover
        "
      /> -->
    </template>
    <template #doc-after>
      <div style="margin-top: 24px">
        <!-- https://giscus.app/zh-CN (评论功能配置手册)-->
        <Giscus 
          :key="page.filePath"
          repo="[在此输入仓库]"
          repo-id="[在此输入仓库 ID]"
          category="[在此输入分类名]"
          category-id="[在此输入分类 ID]"
          mapping="pathname"
          strict="0"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="bottom"
          lang="zh-CN"
          crossorigin="anonymous"
          :theme="isDark ? 'dark' : 'light'"
        />
      </div>
    </template>
  </Layout>
</template>

<script setup>
import Giscus from "@giscus/vue";
import DefaultTheme from "vitepress/theme";
import { Image, ConfigProvider } from 'ant-design-vue'
import { useData } from "vitepress";

const { Layout } = DefaultTheme;
const { isDark, page } = useData();
</script>
```
:::

## 其他
<ActionComVue type="danger">
 注意： 因为 Giscus 插件是通过插槽的形式挂载到页面上的，因此当页面为自定义布局时，插件将无法生效，需要自己手动挂载
</ActionComVue>
