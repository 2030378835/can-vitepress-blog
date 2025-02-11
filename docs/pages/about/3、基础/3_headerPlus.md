---
  title: 导航栏拓展
  date: 2025-02-11
  tags: [基础]
  outline: 
    level: [2, 2]
    label: '页面导航'
---

<script setup>
  import ActionComVue from '../../../components/action/index.vue'
</script>

>[!tip] 💡 DropDown 、DropdownItem
>使用 自定义封装的 DropDown 组件实现导航栏拓展

实际效果可参考 [Dropdown 下拉菜单](/pages/about/4、组件/dropdown.html)，以及该网站导航栏。

## 实现原理
`can-vitepress-blog`严格遵循 [VitePress 导航栏](https://vitepress.dev/zh/reference/default-theme-nav) 中的说明，因此导航栏拓展的实现原理与文档中描述的实现原理一致。

## 基础用法

* 自定义组件 `DropDown`、`DropdownItem`
* 在`theme/index.ts`全局注册 `DropDown`、`DropdownItem`
```ts
// 公共组件
import DropdownItem from './components/dropdownItem/index.vue';
import Dropdown from './components/dropdown/index.vue';


export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 将封装好的vue组件全局注册即可使用
    const routes = app;
    app.component('DropdownItem', DropdownItem)
    app.component('Dropdown', Dropdown)
  },
};
```
* 在配置文件`config.mts`中使用 DropDown、DropdownItem

你可以通过使用 `component` 选项在导航栏中包含自定义组件。`component` 键对应的值应为 `Vue 组件名`，并且必须使用 `Theme.enhanceApp` 全局注册。

```ts
themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        component: 'DropdownItem',
        props: {
          config: {
            title: '归档',
            path: '/archive',
            style: {background: 'rgba(0,0,0,0)'}
          }
        }
      },
      {
        component: 'DropdownItem',
        props: {
          config: {
            isNew: true,
            title: 'About',
            path: '/readme',
            style: {background: 'rgba(0,0,0,0)'}
          }
        }
      },
      {
        component: 'Dropdown',
        props: {
          configs: {
            title: '作品集',
            isNew: true,
            items: [
              {
                isLink: true,
                title: 'can-cli（未发布）',
                link: 'https://gitee.com/qq2057187934/can-cli',
              },
              {
                isNew: true,
                isLink: true,
                title: 'can-vitepress-blog',
                link: 'https://github.com/2030378835/can-vitepress-blog'
              }
            ]
          }
        }
      }
    ],
}
```
<ActionComVue type="danger">
  注意：首页（link: '/'）不能使用DropDown、DropdownItem组件拓展
</ActionComVue>




