<template>
  <div 
    :style="{
      width: props.width,
      WebkitLineClamp: props.line,
    }" 
    :title="props.text" 
    class="ellipsis"
  >
    {{ props.text }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '200px'
  },
  line: {
    type: Number,
    default: 1
  }
})
</script>

<style lang="scss" scoped>
.ellipsis {
  // 限制展示一行 超出用...展示
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /* 设置伸缩盒子的子元素排列方式为垂直方向 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 用省略号表示超出的文本 */
}
</style>