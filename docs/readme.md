---
layout: doc
---
<script setup>
  import { ref } from 'vue'
  import Progress from './components/progress/index.vue'
  import EllipsisSpan from './components/ellipsisSpan/index.vue'
  import { Checkbox } from 'ant-design-vue'

  const checked = ref(true)
</script>
<style lang="scss" scope>
  .listItem {
    display: flex;
    padding: 2px 0;
    font-size: 14px;
    div, label {
      margin-right: 2px;
      transform: scale(0.9);
    }
    label {
      margin-right: 8px;
    }
  }
</style>

# 项目说明
## 一、简介
### 1.1 介绍
can-blog 是一个基于 vitepress + antdv 的博客系统，基于 can-blog 开发者可以快速搭建自己的博客系统。
### 1.2 特点
::: tip 👓
- 简洁：基于 vitepress 搭建，简洁易用。
- 美观：基于 antdv 搭建，美观大方。
- 快速：基于 vite 搭建，快速启动。
- 强大：页面写作实时渲染，图片上传无需手动导入。
:::

## 二、目录结构
### 2.1 主要目录结构
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
### 2.2 目录解析
- `docs`：博客文档目录
  在此目录下存放博客的文档内容。
  - `.vuepress`：配置目录
    - `config.mjs`：博客配置文件
    - `theme`：博客主题目录
    其中theme中的`template`为博客的模板文件夹，`style`为博客的样式文架，`index.ts`为博客的主入口文件，`post.data.mts`为博客的模板数据文件。模版文件对应`docs`目录下的md文件
  - `pages`：页面目录
    - `docs`：存放博客的文章内容，用文件夹分类。
  - `components`：组件目录
  - `public`：公共资源目录
  - `router`：路由目录
- `server`：博客服务目录
  启动server目录下的index.js文件，即可启动服务，该服务用语写作功能的服务，不用于线上服务，当您需要打包后上线时，请跳过server文件夹。
- 更多细节请查看[目录结构详解](/other)

> [!WARNING] ⚠️ 注意
> 在正式使用该博客系统前，请先阅读 [vitepress官方文档](https://vitepress.dev/zh/guide/what-is-vitepress)

> [!TIP] 🎉 提示
> 有任何不懂的地方可在下方留言区进行交流

## 三、功能集合
### 3.1 上线功能

- <div class="listItem">
    <Checkbox v-model:checked="checked" />
    <a href="https://giscus.app/zh-CN" target="_blank">giscus</a> 驱动留言/评论
  </div>
- <div class="listItem"><Checkbox v-model:checked="checked" />轮播图</div>
- <div class="listItem"><Checkbox v-model:checked="checked" />音乐播放器</div>
- <div class="listItem"><Checkbox v-model:checked="checked" />归档热力图</div>
- <div class="listItem"><Checkbox v-model:checked="checked" />归档时间线</div>
- <div class="listItem">
    <Checkbox v-model:checked="checked" />
    <a href="https://github.com/imzbf/md-editor-v3" target="_blank">md-editor-v3</a>支持本地md编写支持上传图片
  </div>
- <div class="listItem"><Checkbox v-model:checked="checked" />文章锚点支持2到6级</div>

### 3.2 待上线功能

- <div class="listItem"><Progress :percent="90"/> 代码结构优化</div>
- <div class="listItem"><Progress :percent="70"/> 首页文章列表优化</div>
- <div class="listItem"><Progress :percent="60"/> 文章布局优化</div>
- <div class="listItem"><Progress :percent="60"/> 动态文章配置文件输出</div>
- <div class="listItem"><Progress :percent="50"/> antdv主题色快捷更换</div>
- <div class="listItem"><Progress :percent="20"/> Hooks开发</div>
- <div class="listItem"><Progress :percent="10"/> 标签转图片为文章封面图</div>
- <div class="listItem"><Progress :percent="10"/> 博客概览信息（文章数，网站运行天数，字数，访问量等等）</div>
- <div class="listItem"><Progress :percent="0"/> 图片预览</div>
- <div class="listItem"><Progress :percent="0"/> 脚手架配置项目（重点）</div>

## 四、最后
### 4.1 参考
- [@sugarat/theme](https://theme.sugarat.top/)
- [友人AMain Navigation](http://niubin.site/)
### 4.2 反馈&建议
> [!NOTE] 📒 反馈&建议
> 欢迎在以下评论区域进行反馈，我会及时回复

谢谢大家