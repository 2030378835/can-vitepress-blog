import{_ as i,U as a,av as n,S as t}from"./chunks/framework.DXYK1geT.js";const l="/docsImage/1736751065061.png",E=JSON.parse('{"title":"目录结构详解","description":"","frontmatter":{},"headers":[],"relativePath":"other.md","filePath":"other.md","lastUpdated":1736755142000}'),p={name:"other.md"};function e(h,s,k,d,c,o){return t(),a("div",null,s[0]||(s[0]=[n(`<h1 id="目录结构详解" tabindex="-1">目录结构详解 <a class="header-anchor" href="#目录结构详解" aria-label="Permalink to &quot;目录结构详解&quot;">​</a></h1><h2 id="一、目录结构" tabindex="-1">一、目录结构 <a class="header-anchor" href="#一、目录结构" aria-label="Permalink to &quot;一、目录结构&quot;">​</a></h2><div class="language-can-blog vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">can-blog</span><pre class="shiki shiki-themes github-light github-dark has-focused-lines vp-code" tabindex="0"><code><span class="line"><span>  ├── docs  //------------------------ 博客项目内容，你的绝大多数操作在此处进行            </span></span>
<span class="line"><span>  │   ├── .vuepress  //--------------- 博客项目配置文件夹                                       </span></span>
<span class="line has-focus"><span>  │   │   ├── config.mjs  //---------- 博客项目配置文件，用于配置当航条页签logo之类的</span></span>
<span class="line"><span>  │   │   └── theme  //--------------- 博客项目主题文件夹</span></span>
<span class="line"><span>  │   │     ├── style  //------------- 博客项目主题样式文件夹</span></span>
<span class="line"><span>  │   │     ├── template  //---------- 博客项目主题模板文件夹（用于自定义模版）</span></span>
<span class="line has-focus"><span>  │   │     ├── layout  //------------ 博客项目主题布局文件夹（用于自定义布局，如每一页vitepress默认模版下均有评论组件）</span></span>
<span class="line"><span>  │   │     ├── index.ts  //---------- 博客项目主题入口文件（用于导入自定义模版、注册模版组件、antdv引入等）</span></span>
<span class="line has-focus"><span>  │   │     └── post.data.mts  //----- 博客项目主题数据文件（用于自定义数据，如博客列表页的博客数据）</span></span>
<span class="line"><span>  │   ├── components //--------------- 博客项目组件文件夹</span></span>
<span class="line"><span>  │   ├── pages //-------------------- 博客项目页面文件夹</span></span>
<span class="line has-focus"><span>  │   │     ├── docs  //-------------- 博客文章文件夹，存放博客文章（不建议在此文件夹下存放其他文件，如图片等）</span></span>
<span class="line"><span>  │   │     ├── ...  //--------------- 其他博客页面文件夹</span></span>
<span class="line has-focus"><span>  │   ├── public  //------------------ 博客项目公共资源文件夹</span></span>
<span class="line"><span>  │   │     ├── desktop  //----------- 博客项目桌面壁纸存放文件夹</span></span>
<span class="line"><span>  │   │     ├── docsImage  //--------- 博客项目博客图片存放文件夹，用于存放在写作页面上传的图片</span></span>
<span class="line"><span>  │   │     ├── icon   //------------- 博客项目图标存放文件夹</span></span>
<span class="line"><span>  │   │     ├── logo  //-------------- 博客项目logo存放文件夹</span></span>
<span class="line"><span>  │   │     ├── music  //------------- 博客项目音乐存放文件夹</span></span>
<span class="line"><span>  │   │     └── favicon.ico  //------- 博客项目图标</span></span>
<span class="line"><span>  │   └── router  //------------------ 博客项目路由文件夹</span></span>
<span class="line has-focus"><span>  │     └── index.ts  //-------------- 博客项目路由入口文件（用于博客文章侧边栏的配置，以及路由配置）</span></span>
<span class="line has-focus"><span>  ├── server  //---------------------- 博客项目服务文件夹（用于写作页面的功能实习）</span></span>
<span class="line"><span>  │     └── index.ts  //-------------- 博客项目服务入口文件</span></span>
<span class="line has-focus"><span>  ├── vitepress.config.ts  //--------- 博客项目配置文件,用于CommonJS配置md静态图片存放文件夹、md存放文件夹等</span></span>
<span class="line has-focus"><span>  ├── vitepress.config.ES.ts  //------ 博客项目配置文件,用于ES模块配置md静态图片存放文件夹、md存放文件夹等</span></span>
<span class="line"><span>  ├── package.json  //---------------- 博客项目依赖配置文件</span></span>
<span class="line"><span>  └── .gitignore   //----------------- 博客项目git忽略文件</span></span></code></pre></div><h2 id="二、重点目录结构说明" tabindex="-1">二、重点目录结构说明 <a class="header-anchor" href="#二、重点目录结构说明" aria-label="Permalink to &quot;二、重点目录结构说明&quot;">​</a></h2><ul><li><p><code>config.mjs</code> 中的<code>getSidebar</code>方法依赖于 <code>router/index.ts</code>，用于sidebar的自动生成；项目默认使用多侧边栏形式，在<code>pages/docs</code>的每一个子文件夹代表一个侧边栏。</p></li><li><p><code>post.data.mts</code> 用于返回指定目录下的md文件的<code>头部配置[1]</code>等一系列相关数据，具体可查看 <a href="https://vitepress.dev/zh/guide/data-loading#createcontentloader" target="_blank" rel="noreferrer">构建时数据加载</a>，在不更改目录文件下时无需更改此文件；默认返回以下数据。</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">  title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">page.frontmatter.title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">  date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">page.frontmatter.date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">  desc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">page.frontmatter.description</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> ||</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> page.excerpt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">  url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">page.url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">  tags</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">page.frontmatter.tags</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">  cover</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">page.frontmatter.cover</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></li><li><p><code>pages/docs</code> 不建议更改 <code>pages/docs</code> 目录，只需要在此目录下建立文件夹书写md即可，<strong>若不更改目录并在写作页面中写作提交时选择标签，若标签为自己输入的标签（第一个）那么项目会在<code>pages/docs/</code>下创建该标签名的目录</strong><img src="`+l+`" alt=""></p></li><li><p><code>public</code> 静态目录文件夹，不建议删除其目录下的任何目录</p></li><li><p><code>router</code> 侧边栏配置文件，默认为多侧边栏，其中使用插件 <a href="https://vitepress-sidebar.cdget.com/zhHans/" target="_blank" rel="noreferrer">vitepress-sidebar</a> 进行侧边栏的自动生成</p></li><li><p><code>server</code> 开发服务文件夹，用于博客写作功能的实现，可结合 <code>components/createMDFile/</code> 进行二次开发</p></li><li><p><code>vitepress.config.ts</code> 博客项目配置文件，用于配置博客项目的一些基础信息，如博客标题、博客描述、博客图标等，以及md静态图片存放文件夹、md存放文件夹等。</p></li><li><p><code>vitepress.config.ES.ts</code> 博客项目配置文件，用于配置博客项目的一些基础信息，如博客标题、博客描述、博客图标等，以及md静态图片存放文件夹、md存放文件夹等。</p></li></ul><div class="danger custom-block github-alert"><p class="custom-block-title">注意⛔️</p><p><code>vitepress.config.ES.ts</code> 和 <code>vitepress.config.ts</code> 描述的内容应该是一致的，其中 <code>vitepress.config.ts</code> 在写作操作时会自动配置，我们在打包之前或者运行之前应当保证vitepress.config.ES.ts<code>和</code>vitepress.config.ts\` 描述的内容是一致的。</p></div><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-fdYC1" id="tab-tW2M42T" checked><label data-title="vitepress.config.ts" for="tab-tW2M42T">vitepress.config.ts</label><input type="radio" name="group-fdYC1" id="tab-X7dcLmG"><label data-title="vitepress.config.ES.ts" for="tab-X7dcLmG">vitepress.config.ES.ts</label></div><div class="blocks"><div class="language-ts vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// CommonJS</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> defaultConfig</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  docsBaseDir: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/docs/pages/about/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 文档根目录</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  docsKindDir: [], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 文档类型，不建议手动写入；建议在写作页面中选择的第一个标签，然后自动生成。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  docsImageDir: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/docsImage&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 图片目录</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  defaultAuther: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;qiangcan&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  blogTitle: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;CAN BLOG&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  blogDescription: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;can blog&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  blogLogo: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/logo.png&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,   </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  base: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> defaultConfig;</span></span></code></pre></div><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ESModuleJS</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> defaultConfigES</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  docsBaseDir: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/docs/pages/about/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 文档根目录</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  docsKindDir: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1、开始&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 文档类型，不建议手动写入；建议在写作页面中选择的第一个标签，然后自动生成。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  docsImageDir: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/docsImage&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 图片目录</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  defaultAuther: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;qiangcan&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  blogTitle: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;CAN BLOG&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  blogDescription: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;can blog&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  blogLogo: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/logo.png&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,   </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  base: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> defaultConfigES;</span></span></code></pre></div></div></div>`,7)]))}const g=i(p,[["render",e]]);export{E as __pageData,g as default};
