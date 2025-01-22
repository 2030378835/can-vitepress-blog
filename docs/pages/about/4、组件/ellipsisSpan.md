---
  title: EllipsisSpan 限行
  date: 2025-01-19
  tags: [组件]
  outline: 
    level: [2, 2]
    label: '页面导航'
---
<script setup>
  import EllipsisSpan from '../../../components/ellipsisSpan/index.vue'
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
      name: 'text',
      desc: '类型',
      type: 'String',
      default: 'null',
    },
    {
      name: 'width',
      desc: '宽度',
      type: 'String',
      default: '200px',
    },
    {
      name: 'line',
      desc: '限制的行数',
      type: 'Number',
      default: '1',
    }
  ]
</script>

当你需要给一段文本添加省略号效果时，可以使用这个组件。

## 设置盒子宽度
在文本宽度超过盒子宽度时，会出现省略号效果。
<EllipsisSpan style="border: 1px solid var(--vp-c-brand-1)" text="这是一个测试" width="50px" />
<br/>
<EllipsisSpan style="border: 1px solid var(--vp-c-brand-1)" text="这是一个测试" width="100px" />

::: details 点我查看代码
```vue
<template>
  <div>
    <EllipsisSpan style="border: 1px solid var(--vp-c-brand-1)" text="这是一个测试" width="50px" />
    <EllipsisSpan style="border: 1px solid var(--vp-c-brand-1)" text="这是一个测试" width="100px" />
  </div>
</template>
```
:::

## 设置盒子限行
在文本宽度超过盒子宽度时，会出现换行，当限行超过line行时，会出现省略号效果。
<EllipsisSpan 
  style="border: 1px solid var(--vp-c-brand-1)" 
  text="在文本宽度超过盒子宽度时，会出现换行，当限行超过line行时，会出现省略号效果。
" 
  width="100px" 
  :line="2"
/>

::: details 点我查看代码
```vue
<template>
  <div>
    <EllipsisSpan 
      style="border: 1px solid var(--vp-c-brand-1)" 
      text="在文本宽度超过盒子宽度时，会出现换行，当限行超过line行时，会出现省略号效果。
    " 
      width="100px" 
      :line="2"
    />
  </div>
</template>
```
:::

## API

### Attributes
<Table :pagination="false" :bordered="false" :dataSource="tableData" :columns="tableColumns"/>