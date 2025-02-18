---
  title: Dropdown 下拉菜单
  date: 2025-02-07
  tags: [组件]
  outline: 
    level: [2, 2]
    label: '页面导航'
---
<script setup>
  import Dropdown from '../../../.vitepress/theme/components/dropdown/index.vue'
  import DropdownItem from '../../../.vitepress/theme/components/dropdownItem/index.vue'
  import { Table } from 'ant-design-vue'

  const tableColumns = [
    {
      title: '属性',
      dataIndex: 'name',
      width: 1000,
    },
    {
      title: '说明',
      dataIndex: 'desc',
      width: 1000,
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 1000,
    },
    {
      title: '默认值',
      dataIndex: 'default',
      width: 1000,
    },
  ]
  const tableData = [
    {
      name: 'type',
      desc: '类型',
      type: 'String',
      default: 'info（可选：success、warning、info、danger）',
    },
  ]
</script>

当你需要一个让人注意的动作时，比如提示、警告或通知时可以使用 Action 消息动作。

## 基础用法

<Dropdown :configs="{
  isNew: false,
  title: 'DROPDOWN',
  style: {},
  items: [1,2,3].map(i => (
    {
      isNew: false,
      title: 'Item'+i,
      path: 'Item'+i,
      style: {},
      isTab: false
    }
  ))
}" />

::: details 点我查看代码
```vue
<template>
  <Dropdown :configs="{
    isNew: false,
    title: 'DROPDOWN',
    style: {},
    items: [1,2,3].map(i => (
      {
        isNew: false,
        title: 'Item'+i,
        path: 'Item'+i,
        style: {},
        isTab: false
      }
    ))
  }" />
</template>
```
:::

## 新标签的下菜单
只需要讲 `configs.isNew` 为 `true` 即可

### 头部为new
<Dropdown :configs="{
  isNew: true,
  title: 'DROPDOWN',
  style: {},
  items: [1,2,3].map(i => (
    {
      isNew: false,
      isLink: false,
      title: 'Item'+i,
      path: 'Item'+i,
      style: {},
      isTab: false
    }
  ))
}" />

::: details 点我查看代码
```vue
<template>
  <Dropdown :configs="{
    isNew: true,
    title: 'DROPDOWN',
    style: {},
    items: [1,2,3].map(i => (
      {
        isNew: false,
        isLink: false,
        title: 'Item'+i,
        path: 'Item'+i,
        style: {},
        isTab: false
      }
    ))
  }" />
</template>
```
:::
### 下啦选项为new
<Dropdown :configs="{
  title: 'DROPDOWN',
  items: [1,2,3].map(i => (
    {
      isNew: true,
      isLink: false,
      title: 'Item'+i,
      path: 'Item'+i,
      style: {},
      isTab: false
    }
  ))
}" />

::: details 点我查看代码
```vue
<Dropdown :configs="{
  title: 'DROPDOWN',
  items: [1,2,3].map(i => (
    {
      isNew: true,
      isLink: false,
      title: 'Item'+i,
      path: 'Item'+i,
      style: {},
      isTab: false
    }
  ))
}" />
```
:::

## 链接类型

设置`items`的每一项`config`的`link`即可自动使用链接类型
<Dropdown :configs="{
  title: 'DROPDOWN',
  items: [1,2,3].map(i => (
    {
      title: 'Item'+i,
      link: 'https://vitepress.dev/zh/reference/default-theme-sidebar#usesidebar',
      style: {},
      isTab: false
    }
  ))
}" />

::: details 点我查看代码
```vue
  <Dropdown :configs="{
    title: 'DROPDOWN',
    items: [1,2,3].map(i => (
      {
        title: 'Item'+i,
        link: 'https://vitepress.dev/zh/reference/default-theme-sidebar#usesidebar',
        style: {},
        isTab: false
      }
    ))
  }" />
```
:::

## API

### Attributes

::: code-group
```ts [Dropdown]
interface Config {
  isNew?: boolean;
  title: string;
  style?: any;
  items: Configs[];
}

interface Configs extends Config {
  link?: string;
  path?: string;
}

const props = withDefaults(defineProps<{
  configs: Configs;
}>(), {
  configs: () => ({
    isNew: false,
    title: 'DROPDOWN',
    style: {},
    items: []
  })
});
```
```ts [DropdownItem]
const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      isNew: false,
      title: '',
      link: '',
      path: '',
      style: {},
      isTab: false
    })
  },
  isActive: {
    type: Boolean,
    default: false
  }
})
```
:::

