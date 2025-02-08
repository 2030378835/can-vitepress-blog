---
  title: RootAction 全局通知
  date: 2025-02-08
  tags: [组件]
  outline: 
    level: [2, 2]
    label: '页面导航'
---
<script setup>
  import RootAction from '../../../.vitepress/theme/components/rootAction/index.vue'
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
      name: 'title',
      desc: '标题',
      type: 'String',
      default: 'title',
    },
    {
      name: 'desc',
      desc: '描述',
      type: 'String',
      default: '描述',
    },
    {
      name: 'link',
      desc: '链接地址（当有link的时候，desc将显示为链接）',
      type: 'String',
      default: 'null',
    },
    {
      name: 'closable',
      desc: '是否可关闭',
      type: 'Boolean',
      default: 'true',
    },
  ]
</script>

当你需要一个让人注意的全局动作时，比如广告语，全局提示等时候，可以使用RootAction。

## 基础用法

文字描述时：
<RootAction  :actions="[{
  title: 'WELCOME',
  desc: '欢迎来到 can-vitepress-blog 使用文档',
  closable: true,
}]" />

链接描述时：
<RootAction  :actions="[{
  title: 'BAIDU',
  desc: '百度一下你就知道',
  closable: true,
  link: 'https://www.baidu.com',
}]" />

不可关闭时：
<RootAction  :actions="[{
  title: 'BAIDU',
  desc: '百度一下你就知道',
  closable: false,
  link: 'https://www.baidu.com',
}]" />

::: details 点我查看代码
```vue
<template>
  <div>
    文字描述时：
    <RootAction  :actions="[{
      title: 'WELCOME',
      desc: '欢迎来到 can-vitepress-blog 使用文档',
      closable: true,
    }]" />

    链接描述时：
    <RootAction  :actions="[{
      title: 'BAIDU',
      desc: '百度一下你就知道',
      closable: true,
      link: 'https://www.baidu.com',
    }]" />

    不可关闭时：
    <RootAction  :actions="[{
      title: 'BAIDU',
      desc: '百度一下你就知道',
      closable: false,
      link: 'https://www.baidu.com',
    }]" />

  </div>
</template>
```
:::

## 自定义样式
你可用原生style属性自定义样式输出
<RootAction style="background: red" />

::: details 点我查看代码
```vue
<template>
  <div>
    你可用原生style属性自定义样式输出
    <RootAction  style="background: red" />
  </div>
</template>
```
:::

## API

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  --- | --- | --- | --- | --- |
| actions | 配置项 | Array | 以下表格的属性 | - |

<Table :pagination="false" :bordered="false" :dataSource="tableData" :columns="tableColumns"/>