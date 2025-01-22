---
  title: 开始写作
  date: 2025-01-17
  tags: [写作]
  outline: 
    level: [2, 2]
    label: '页面导航'
---
<script setup>
  import ActionComVue from '../../../components/action/index.vue'
  import { Image } from 'ant-design-vue'
  import defaultConfigES from '../../../../vitepress.config.ES.ts'

</script>
VitePress 带有内置的 Markdown 扩展。

## Markdown扩展
>[!tip] 💡提示
>推荐参考vitepress [Markdown 扩展](https://vitepress.dev/zh/guide/markdown)

## 在写作页面写作
写作页面[传送门](/upload)

示例：
<Image style="border: 1px solid var(--vp-c-brand-1);border-radius:4px;" :src="defaultConfigES.base+'/docsImage/image.png'"/>

>[!tip]😁提示 根据写作页面提示填写内容并提交即可。

>[!tip]如何在写作页面使用组件ant-design-vue/Image?
>1.在写作页面中可以使用组件`Image`，只要在文章头部引入即可。
>```vue
><script setup>
>  import { Image } from 'ant-design-vue'
></script>
><Image src="/docsImage/image.png"/>
>```
>2.其中的`src`为图片的路径。可以在上传文件后将返回的图片路径复制到`Image的src`中即可。
>
>3.以上示例为在Markdown中使用组件Image的示例。



>[!IMPORTANT] 🤔为何使用Image组件?
> 因为Image组件支持预览，以及根据自己需要进行一些扩展，可以提高用户体验。

注意 💡

<ActionComVue type="danger">
  1、除了在写作页面中使用组件Image外，还可以使用 ant-design-vue 支持的其他组件，只需引入即可。
  2、由于 md-editor-v3 的限制，某些组件无法在其预览中呈现，故而在使用其他组件时需要在运行的对应页面中查看预览效果。
</ActionComVue>

例如：
<Image style="border: 1px solid var(--vp-c-brand-1);border-radius:4px;" :src="defaultConfigES.base+'/docsImage/image1.png'"/>

## 在vscode中写作

<ActionComVue type="warning">
注意：在vscode中写作需要注意很多东西，尤其是配置的手动添加。
</ActionComVue>

>[!tip]写作步骤
>1. 查看`vitepress.config.ts`文件中的`docsBaseDir`配置项，默认为 `/docs/pages/docs/`。
> ```ts
>const defaultConfig = {
>    docsBaseDir: '/docs/pages/docs/', // 文档根目录 // [!code focus]
>    docsKindDir: [], // 文档类型，不建议手动写入；建议在写作页面中选择的第一个标签，然后自动生成。
>    docsImageDir: '/docsImage', // 图片目录
>    defaultAuther: 'qiangcan',
>    blogTitle: 'CAN BLOG',
>    blogDescription: 'can blog',
>    blogLogo: '/logo.png',    
>};
>```
>2. 在`docsBaseDir`下创建你所需要的文章文件夹，每一个文件夹为文章的分类，在该分类下创建你的文章。
>3. 每次创建一个不同的文件夹需要在`vitepress.config.ts`文件中的`docsKindDir`配置项添加对应的文件夹名称，可以为中文。
>```ts
>const defaultConfig = {
>    docsBaseDir: '/docs/pages/docs/', // 文档根目录
>    docsKindDir: ['vue'], // 文档类型，不建议手动写入；建议在写作页面中选择的第一个标签，然后自动生成。// [!code focus]
>    docsImageDir: '/docsImage', // 图片目录
>    defaultAuther: 'qiangcan',
>    blogTitle: 'CAN BLOG',
>    blogDescription: 'can blog',
>    blogLogo: '/logo.png',    
>};
>```
>4. 每个文章文件的名称为文件夹目录下的数量开头，如目前文件夹下有3篇文章，那么下一篇文章文件名为`4_文章名.md`，若是使用`写作`功能，那么则为`4.md`
>
>5. 每一个md文件需遵循 [frontmatter](https://vitepress.dev/zh/guide/frontmatter)写作规范。
>
>基础md配置
>```md
>---
> {
>   title: 标题,
>   date: 日期,
>   desc: 描述,
>   tags: 标签,
>   cover: 封面,
>   author: 作者
> }
>---  
>```
>
>类型
>```ts
>interface frontmatterType {
>  title: string
>  date: string
>  desc: string
>  tags: string[]
>  cover: string
>  author?: string
>}
>```

## 命名规范
- 文件夹名称：如`1_开始；1、开始`;其中数字表示在统一侧边栏下的排序。
- 数字_文件命名：`数字_文件名称`，如`1_开始.md`；其中数字表示在文件夹下的排序。

<ActionComVue type="success">
  注意：使用`写作`功能时无需手动配置`frontmatterType`，系统会自动生成。
</ActionComVue>


