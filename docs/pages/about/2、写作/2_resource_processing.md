---
  title: 资源处理
  date: 2025-01-17
  tags: [写作]
  outline: 
    level: [2, 3]
    label: '页面导航'
---
<script setup>
  import ActionComVue from '../../../components/action/index.vue'
  import { Image } from 'ant-design-vue'
  import defaultConfigES from '../../../../vitepress.config.ES.ts'

</script>

>[!TIP] 💡 基本资源处理
>参考 [vitepress资源处理](https://vitepress.dev/zh/guide/asset-handling)

## 资源结构

### public

```can-blog
  ├── docs
  │   ├── public // [!code focus]
  │   │   ├── desktop // 桌面壁纸目录
  │   │   ├── docsImage // 文档图片目录，包括文档封面 // [!code focus]
  │   │   ├── icon // 一些图标、以及iconfont图标
  │   │   ├── logo // 博客logo
  │   │   ├── music // 音乐资源 // [!code focus]
  │   │   │  ├── 1.mp3 // [!code focus]
  │   │   │  ├── ... 
  │   │   │  ├── musicmsg.js // [!code focus]
  │   │   │  └── config.js // [!code focus]
  │   │   ├── favicon.ico // 博客图标
  │   │   └── ...
  │   └── ...
  └── ...
```
### docsImage

文档图片目录，包括文档封面，默认为`docsImage`，可在`vitepress.config.ts`配置中修改
```ts
const defaultConfig = {
    docsBaseDir: '/docs/pages/docs/', // 文档根目录
    docsKindDir: [], // 文档类型，不建议手动写入；建议在写作页面中选择的第一个标签，然后自动生成。
    docsImageDir: '/docsImage', // 图片目录 // [!code focus]
    defaultAuther: 'qiangcan',
    blogTitle: 'CAN BLOG',
    blogDescription: 'can blog',
    blogLogo: '/logo.png',    
};
```

### music

`music`目录，存放音乐资源，支持`mp3`格式，支持多首音乐，支持自定义音乐信息，支持自定义音乐列表。

#### musicmsg.js
音乐歌词资源
>[!TIP] 歌词处理函数
>```js
>const getObjOfmsg = (lyricsLines) => {
>  const lines = lyricsLines.split('\n');
>  const result = {};
>  lines.forEach(line => {
>    const timeMatch = line.match(/\[(\d{2}):(\d{2}\.\d+)\]/);
>    if (timeMatch) {
>      const minutes = parseInt(timeMatch[1]);
>      const seconds = parseFloat(timeMatch[2]);
>      const totalSeconds = minutes * 60 + seconds;
>      result[totalSeconds] = line.replace(/\[(\d{2}):(\d{2}\.\d+)\]/, '');
>    }
>  });
>  return result;
>}
>```
>接受一个字符串参数，返回一个对象。
>```js
>const lyricsLines = 
>`
>   [00:00.0]晴天 - 周杰伦 (Jay Chou)
>   [00:02.25]词：周杰伦
>   [00:04.5]曲：周杰伦
>   [00:06.75]编曲：周杰伦
>   [00:09.0]制作人：周杰伦
>   [00:11.25]合声：周杰伦
>   [00:13.5]合声编写：周杰伦
>   [00:15.75]吉他：蔡科俊Again
>   [00:18.0]贝斯：陈任佑
>   [00:20.25]鼓：陈柏州
>   [00:22.51]录音助理：刘勇志
>   [00:24.76]录音工程：杨瑞代（Alfa Studio）
>   [00:27.01]混音工程：杨大纬（杨大纬录音工作室）
>   [00:29.26]故事的小黄花
>   ...
>`
> return getObjOfmsg(lyricsLines):{
>  time: msg // time为在该时间（多少秒）播放msg
>}
>```

#### config.js

音乐配置文件
>[!TIP] 音乐配置文件
>```ts
>export default [
>  {
>    name: '枫',
>    singger: '周杰伦',
>    msg: feng,
>  },
>  {
>    name: '花海',
>    singger: '周杰伦',
>    msg: huahai,
>  },
>]
>``` 

## 运行时md资源
<ActionComVue type="success">
解释：运行时资源是指博客运行时加载的md文章资源。
</ActionComVue>

在了解运行时资源前推荐优先阅读[vitepress运行时API](https://vitepress.dev/zh/reference/runtime-api)

Examples:
::: code-group
```ts [post.data.ts]
// posts.data.js
import { createContentLoader } from 'vitepress'
const defaultConfig = require('../../../vitepress.config')

const createContentLoaderDirArr = defaultConfig.docsBaseDir.split('/');
createContentLoaderDirArr.shift();
createContentLoaderDirArr.shift();

const createContentLoaderDir = createContentLoaderDirArr.join('/');
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
        url: page.url,
        tags: page.frontmatter.tags,
        cover: page.frontmatter.cover,
        author: page.frontmatter.author
      }
    })
  }
})
```

```vue [home.vue]
<script setup>
import { onMounted } from 'vue'
import { data as posData } from '/.vitepress/theme/post.data'

onMounted(() => {
  console.log(posData) // 打印数据 frontmatterType[]
})
</script>
```

```ts [frontmatterType.ts]
interface frontmatterType {
  title: string
  date: string
  desc: string
  tags: string[]
  cover: string
  author?: string
}
```
:::

## 图标资源
图标资源我们推荐使用svg图标或者 [iconfont](https://www.iconfont.cn/) 图标。
<ActionComVue type="success">
  iconfont图标使用我们推荐使用class类名进行使用。 
</ActionComVue>

### 如何优雅的使用iconfont
- 去iconfont官网下并搜索你需要的图标将其添加到购物车中
<Image :src="defaultConfigES.base+'/docsImage/image2.png'" style="border: 1px solid var(--vp-c-brand-1);border-radius:4px;"/>
- 添加购物车后点击购物车在弹出的抽屉框中将你选中的图标添加至项目，若你是第一次使用则需要新建一个项目文件夹
<Image :src="defaultConfigES.base+'/docsImage/image3.png'" style="border: 1px solid var(--vp-c-brand-1);border-radius:4px;"/>
- 添加成功后在跳转的新页面中选择Font class并点击下载到本地
<Image :src="defaultConfigES.base+'/docsImage/image4.png'" style="border: 1px solid var(--vp-c-brand-1);border-radius:4px;"/>
- 将下载好的资源解压
- 在解压完成的文件夹选择`iconfont.css`文件并将其移动到您的静态目录下（默认情况下为`public/icon`）
- 在需要使用iconfont图标的文件中引入即可
::: code-group
```vue [exmple.vue]
<script setup>
  import '../../public/icon/iconfont.css'
</script>
<template>
  <i class="iconfont icon-qq"></i>
</template>
```
:::

>[!TIP]注意
>- 在`i`标签中使用`iconfont`时必须以 `iconfont 类名`开头，然后在后面使用你的图标标签名。
>- 可以在`iconfront的下载页面`查看图标标签名
>- `iconfont图标`可继承`font的css属性`，如：**color**、**font-size**等

### 解决iconfont.css引入后不显示

<ActionComVue type="danger">
  注意： iconfont.css引入后不显示的问题出现的情况极少，但也不排除是某些原因导致的。
</ActionComVue>

- 检查iconfont.css文件是否正确引入
- 检查无误后若还是如此可到下载页面的项目设置中的字体格式勾选Base64
- 重新下载即可

## 资源收集

| 资源名 | 资源途径 |
| - | - |
| 音乐资源 | [歌曲包](https://www.gequbao.com/)|
| 图标资源 | [iconfont](https://www.iconfont.cn/)|
| 壁纸资源 | [哲风壁纸](https://haowallpaper.com/)|
