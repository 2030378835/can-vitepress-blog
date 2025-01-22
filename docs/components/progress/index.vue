<template>
  <div style="display: flex; align-items: center; justify-content: center;">
    <Progress 
      class="progress"
      :class="{
        'no-percent': props.percent <= 25,
        'small-percent': props.percent <= 50 && props.percent > 25,
        'normal-percent': props.percent <= 75 && props.percent > 50,
        'full-percent': props.percent > 75
      }"
      :percent="props.percent"
      :type="props.type"  
      :size="props.size"
      :strokeWidth="10"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { Progress } from 'ant-design-vue'

const props = defineProps({
  percent: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'circle'
  },
  size: {
    type: Number,
    default: 24
  }
})
</script>

<style lang="scss" scoped>
:deep(.no-percent .ant-progress-circle-path) {
  stroke: #F56C6C !important;
}
:deep(.small-percent .ant-progress-circle-path) {
  stroke: #E6A23C !important;
}
:deep(.normal-percent .ant-progress-circle-path) {
  stroke: #3c78e6 !important;
}
:deep(.full-percent .ant-progress-circle-path) {
  stroke: #67C23A !important;
}
:deep(.progress .ant-progress-text) {
  color: var(--vp-c-text-1) !important;
  font-size: 8px;
} 
</style>