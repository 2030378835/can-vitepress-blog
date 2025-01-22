<!-- 首页切换图 -->
<template>
  <div class="swiper-container">
    <div class="swiper-bar">
      <BarComVue v-model="activeIndex" :data="renderBarData" @change="handleChange" />
    </div>
    <div v-if="activeIndex === 0" class="swiper-content">
      <MusicSwiper/>
    </div>
    <div v-if="activeIndex === 1" class="swiper-content">
      <GoodInternatWebVue />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BarComVue from './bar.vue'
import MusicSwiper from '../../components/musicSwiper/index.vue'
import GoodInternatWebVue from './goodInternetWeb.vue'
const renderBarData = [
  { title: "音乐空间" },
  { title: "网站收集" },
  // { title: "最新发布" },
  // { title: "项目实战" }
]
const activeIndex = ref(1)
const handleChange = (index) => {
  activeIndex.value = index
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  border-radius: 14px;
  height: 315px;
  overflow: hidden;
  display: flex;
  // 周围有阴影
  box-shadow: var(--vp-shadow-swpier-bar);
  .swiper-bar {
    width: 300px;
    min-width: 300px;
    height: 100%;
    // border: 1px solid red;
  }
  .swiper-content {
    // width: 100%;
    flex: 1;
    height: 100%;
    min-width: 600px;
    // border: 1px solid red;
    background: var(--vp-bg-swiper-bar);
  }
}
</style>