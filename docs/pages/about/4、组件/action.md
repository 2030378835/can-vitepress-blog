---
  title: Action 消息动作
  date: 2025-01-19
  tags: [组件]
  outline: 
    level: [2, 2]
    label: '页面导航'
---
<script setup>
  import ActionComVue from '../../../components/action/index.vue'
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
<ActionComVue type="success">success</ActionComVue>
<ActionComVue type="warning">warning</ActionComVue>
<ActionComVue type="info">info</ActionComVue>
<ActionComVue type="danger">danger</ActionComVue>
::: details 点我查看代码
```vue
<template>
  <div>
    <ActionComVue type="success">success</ActionComVue>
    <ActionComVue type="warning">warning</ActionComVue>
    <ActionComVue type="info">info</ActionComVue>
    <ActionComVue type="danger">danger</ActionComVue>
  </div>
</template>
```
:::

## API

### Attributes
<Table :pagination="false" :bordered="false" :dataSource="tableData" :columns="tableColumns"/>