<template>
  <div class="bar">
    <div 
      v-for="(i ,index) in renderData" 
      :key="index" 
      :class="{ 'bar-active': index === active }"
      @click="handleClick(index)"
    >
      <span></span>
      <span>{{ i.title }}</span> 
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, computed, defineModel } from 'vue'
const emits = defineEmits(['change'])
const props = defineProps(['data'])
const active = defineModel()
const handleClick = (i) => {
  emits('change', i)
}
const renderData = computed(() => {
  return props.data
})
</script>

<style lang="scss" scoped>
.bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  // 周围有阴影
  >div {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
    font-size: 18px;
    cursor: pointer;
    background: var(--vp-bg-swiper-bar);
    transition: 300ms;
    >span:nth-child(1) {
      width: 4px;
      height: 16px;
      margin-right: 12px;
      border-radius: 4px;
      transition: 300ms;
    }
  }
}
.bar-active {
  background: var(--vp-h-bar) !important;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.bar-active > span:nth-child(1) {
  background-color: var(--vp-c-brand-1);
}
</style>