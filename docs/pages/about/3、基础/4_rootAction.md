---
  title: 全局通知
  date: 2025-02-11
  tags: [基础]
  outline: 
    level: [2, 2]
    label: '页面导航'
---

<script setup>
  import ActionComVue from '../../../components/action/index.vue'
</script>

>[!tip] 💡 RootAction
>使用 自定义封装的 RootAction 组件实现全局通知功能。

实际效果可参考[RootAction 全局通知](/pages/about/4、组件/rootAction.html)，以及刷新该网站查看是否存在全局通知。

## 实现原理
- 全局注册`RootAction`组件
```ts
// 公共组件
import RootAction from './components/RootAction/index.vue';


export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 将封装好的vue组件全局注册即可使用
    const routes = app;
    app.component('RootAction', RootAction)
  },
};
```
- 在拓展`Layout`组件中调用`RootAction`组件，并传入参数

>[!danger] ⛔️ 注意
>由于全局通知是在导航栏中实现的，因此我们需要将`RootAction`组件挂载到导航栏中。

## 基础用法

- 首先获取导航栏原属

```ts
const VPNav = document.getElementsByClassName('VPNav')[0]
```
- 使用 `h` 和 `createApp` 函数挂载组件`RootAction`
```ts
// 创建子组件实例
  // 创建子组件实例并传递 props
  const childApp = createApp({
    render() {
      return h(RootAction, {
        actions: [
          {
            title: 'WELCOME',
            desc: '欢迎来到 can-vitepress-blog 使用文档',
            style: {
              justifyContent: 'center',
            },
            closable: true,
          },
        ]
      });
    }
  });
  // 创建一个临时的 div 作为挂载点
  const tempDiv = document.createElement('div');
  // 获取 VPNav 的第一个子元素
  const firstChild = VPNav.firstChild;
  // VPNav.appendChild(tempDiv);
  // 将临时的 div 插入到 VPNav 的第一个子元素前
  VPNav.insertBefore(tempDiv, firstChild);

  childApp.mount(tempDiv);
```

- 在 `onMounted`中实现
```ts
onMounted(() => {
  console.log(document.getElementsByClassName('VPNav')[0], 'VPNav')
  const VPNav = document.getElementsByClassName('VPNav')[0]

  // 创建子组件实例
  // 创建子组件实例并传递 props
  const childApp = createApp({
    render() {
      return h(RootAction, {
        actions: [
          {
            title: 'WELCOME',
            desc: '欢迎来到 can-vitepress-blog 使用文档',
            style: {
              justifyContent: 'center',
            },
            closable: true,
          },
        ]
      });
    }
  });
  // 创建一个临时的 div 作为挂载点
  const tempDiv = document.createElement('div');
  // 获取 VPNav 的第一个子元素
  const firstChild = VPNav.firstChild;
  // VPNav.appendChild(tempDiv);
  // 将临时的 div 插入到 VPNav 的第一个子元素前
  VPNav.insertBefore(tempDiv, firstChild);

  childApp.mount(tempDiv);
})
```

