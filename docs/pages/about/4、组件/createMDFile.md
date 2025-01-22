---
  title: CreateMDFile 写作
  date: 2025-01-19
  tags: [组件]
  outline: 
    level: [2, 2]
    label: '页面导航'
---
<script setup>
  import CreateMDFileVue from '../../../components/createMDFile/index.vue'
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
  
  ]
</script>

当你需要写作时，可以使用 CreateMDFile 写作。

## 基础用法
<CreateMDFileVue />
::: details 点我查看代码
```vue
<template>
  <div>
    <CreateMDFileVue />
  </div>
</template>
```
:::

## API

### Attributes
<Table :pagination="false" :bordered="false" :dataSource="tableData" :columns="tableColumns"/>