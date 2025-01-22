# 目录结构详解

## 一、目录结构
```can-blog
  ├── docs  //------------------------ 博客项目内容，你的绝大多数操作在此处进行            
  │   ├── .vuepress  //--------------- 博客项目配置文件夹                                       
  │   │   ├── config.mjs  //---------- 博客项目配置文件，用于配置当航条页签logo之类的 // [!code focus] 
  │   │   └── theme  //--------------- 博客项目主题文件夹
  │   │     ├── style  //------------- 博客项目主题样式文件夹
  │   │     ├── template  //---------- 博客项目主题模板文件夹（用于自定义模版）
  │   │     ├── layout  //------------ 博客项目主题布局文件夹（用于自定义布局，如每一页vitepress默认模版下均有评论组件）// [!code focus] 
  │   │     ├── index.ts  //---------- 博客项目主题入口文件（用于导入自定义模版、注册模版组件、antdv引入等）
  │   │     └── post.data.mts  //----- 博客项目主题数据文件（用于自定义数据，如博客列表页的博客数据） // [!code focus] 
  │   ├── components //--------------- 博客项目组件文件夹
  │   ├── pages //-------------------- 博客项目页面文件夹
  │   │     ├── docs  //-------------- 博客文章文件夹，存放博客文章（不建议在此文件夹下存放其他文件，如图片等）// [!code focus] 
  │   │     ├── ...  //--------------- 其他博客页面文件夹
  │   ├── public  //------------------ 博客项目公共资源文件夹 // [!code focus] 
  │   │     ├── desktop  //----------- 博客项目桌面壁纸存放文件夹
  │   │     ├── docsImage  //--------- 博客项目博客图片存放文件夹，用于存放在写作页面上传的图片
  │   │     ├── icon   //------------- 博客项目图标存放文件夹
  │   │     ├── logo  //-------------- 博客项目logo存放文件夹
  │   │     ├── music  //------------- 博客项目音乐存放文件夹
  │   │     └── favicon.ico  //------- 博客项目图标
  │   └── router  //------------------ 博客项目路由文件夹
  │     └── index.ts  //-------------- 博客项目路由入口文件（用于博客文章侧边栏的配置，以及路由配置）// [!code focus] 
  ├── server  //---------------------- 博客项目服务文件夹（用于写作页面的功能实习）// [!code focus] 
  │     └── index.ts  //-------------- 博客项目服务入口文件
  ├── vitepress.config.ts  //--------- 博客项目配置文件,用于CommonJS配置md静态图片存放文件夹、md存放文件夹等 // [!code focus] 
  ├── vitepress.config.ES.ts  //------ 博客项目配置文件,用于ES模块配置md静态图片存放文件夹、md存放文件夹等 // [!code focus] 
  ├── package.json  //---------------- 博客项目依赖配置文件
  └── .gitignore   //----------------- 博客项目git忽略文件
```
## 二、重点目录结构说明

- `config.mjs` 中的`getSidebar`方法依赖于 `router/index.ts`，用于sidebar的自动生成；项目默认使用多侧边栏形式，在`pages/docs`的每一个子文件夹代表一个侧边栏。

- `post.data.mts` 用于返回指定目录下的md文件的`头部配置[1]`等一系列相关数据，具体可查看 [构建时数据加载](https://vitepress.dev/zh/guide/data-loading#createcontentloader)，在不更改目录文件下时无需更改此文件；默认返回以下数据。

  ```json
  {
    title: page.frontmatter.title,
    date: page.frontmatter.date,
    desc: page.frontmatter.description || page.excerpt,
    url: page.url,
    tags: page.frontmatter.tags,
    cover: page.frontmatter.cover
  }
  ```
- `pages/docs` 不建议更改 `pages/docs` 目录，只需要在此目录下建立文件夹书写md即可，**若不更改目录并在写作页面中写作提交时选择标签，若标签为自己输入的标签（第一个）那么项目会在`pages/docs/`下创建该标签名的目录**
![](/docsImage/image7.png)

  

- `public` 静态目录文件夹，不建议删除其目录下的任何目录

- `router` 侧边栏配置文件，默认为多侧边栏，其中使用插件 [vitepress-sidebar](https://vitepress-sidebar.cdget.com/zhHans/) 进行侧边栏的自动生成

- `server` 开发服务文件夹，用于博客写作功能的实现，可结合 `components/createMDFile/` 进行二次开发

- `vitepress.config.ts` 博客项目配置文件，用于配置博客项目的一些基础信息，如博客标题、博客描述、博客图标等，以及md静态图片存放文件夹、md存放文件夹等。

- `vitepress.config.ES.ts` 博客项目配置文件，用于配置博客项目的一些基础信息，如博客标题、博客描述、博客图标等，以及md静态图片存放文件夹、md存放文件夹等。

>[!danger] 注意⛔️
>`vitepress.config.ES.ts` 和 `vitepress.config.ts` 描述的内容应该是一致的，其中 `vitepress.config.ts` 在写作操作时会自动配置，我们在打包之前或者运行之前应当保证vitepress.config.ES.ts` 和 `vitepress.config.ts` 描述的内容是一致的。
::: code-group
```ts [vitepress.config.ts]
// CommonJS
const defaultConfig = {
  docsBaseDir: '/docs/pages/about/', // 文档根目录
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
```ts [vitepress.config.ES.ts]
// ESModuleJS
const defaultConfigES = {
  docsBaseDir: '/docs/pages/about/', // 文档根目录
  docsKindDir: ['1、开始'], // 文档类型，不建议手动写入；建议在写作页面中选择的第一个标签，然后自动生成。
  docsImageDir: '/docsImage', // 图片目录
  defaultAuther: 'qiangcan',
  blogTitle: 'CAN BLOG',
  blogDescription: 'can blog',
  blogLogo: '/logo.png',   
  base: '' 
};

export default defaultConfigES;

```
:::