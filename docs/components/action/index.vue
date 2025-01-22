<template>
  <div :class="getClass()">
    <span>
      <slot>
      </slot>
    </span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  type: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger', 'info'].includes(value)
    }
  }
})

const getClass = () => {
  return `action action-${props.type}`
}
</script>

<style lang="scss" scoped>
// 定义颜色变量
$action-border-color-info: #cacacaef;
$action-bg-color-info: #c4c4c421;
$action-text-color-info: #999999f3;

$action-border-color-success: #b7eb8fef;
$action-bg-color-success: #92ec3921;
$action-text-color-success: #399e0df3;

$action-border-color-warning: #ffd000ef;
$action-bg-color-warning: #ffe60021;
$action-text-color-warning: #ff9900f3;

$action-border-color-danger: #ff4d4fef;
$action-bg-color-danger: #ff4d4f21;
$action-text-color-danger: #ff4d4ff3;

$action-padding: 5px;
$action-span-padding: 4px 8px;
$action-span-font-size: 14px;
$action-span-border-radius: 4px;

// 公共样式
.action {
  padding: $action-padding;

  > span {
    display: flex;
    border-radius: $action-span-border-radius;
    padding: $action-span-padding;
    align-items: center;
    font-size: $action-span-font-size;
  }
}

// 特定状态样式
.action-info {
  > span {
    border: 1px solid $action-border-color-info;
    background-color: $action-bg-color-info;
    color: $action-text-color-info;
  }
}

.action-success {
  > span {
    border: 1px solid $action-border-color-success;
    background-color: $action-bg-color-success;
    color: $action-text-color-success;
  }
}

.action-warning {
  > span {
    border: 1px solid $action-border-color-warning;
    background-color: $action-bg-color-warning;
    color: $action-text-color-warning;
  }
}

.action-danger {
  > span {
    border: 1px solid $action-border-color-danger;
    background-color: $action-bg-color-danger;
    color: $action-text-color-danger;
  }
}
</style>