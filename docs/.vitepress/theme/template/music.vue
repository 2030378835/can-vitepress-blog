<template>
  <Carousel>
    <div v-for="i in 3" :key="i"  class="swiper">
      <div class="swiper-content" :style="getBg(i)">
      </div>
    </div>
  </Carousel>
  <div class="music-list">
    <div>
      <div class="title1">作者推荐 ></div>
      <MusicItem @play="play" v-for="(i,index) in musicData" :data="i" :index="index" :key="index" />
    </div>
  </div>
  <Musicbar 
    :current="currentIndex"
    :data="musicData[currentIndex]"
    @pre="pre"
    @next="next"
  />
</template>
<script setup>
import { ref } from 'vue'
import { Carousel } from 'ant-design-vue'
import musicData from '../../../public/music/config'

import MusicItem from '../../../components/music/musicItem.vue'
import Musicbar from '../../../components/music/musicbar.vue'
import defaultConfigES from '../../../../vitepress.config.ES.ts'

const currentIndex = ref(0)

const pre = () => {
  currentIndex.value = currentIndex.value - 1
  if (currentIndex.value < 0) {
    currentIndex.value = musicData.length - 1
  }
}
const next = () => {
  currentIndex.value = currentIndex.value + 1
  if (currentIndex.value > musicData.length - 1) {
    currentIndex.value = 0
  }
}

const getBg = (index) => {
  return {
    background: `url('${defaultConfigES.base}/desktop/${index}.jpg')  center /cover`
  }
}
const play = (index) => {
  console.log(index);
  currentIndex.value = index
}
</script>
<style scoped lang="scss">
.swiper {
  height: 280px;
  width: 100vw;
  div {
    width: 100vw;
  }
  .swiper-content {
    height: 100%;
  }
}
.music-list {
  height: 100vh;
  min-height: 500px;
  display: flex;
  justify-content: center;
  >div {
    width: 820px;
    height: 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
.title1 {
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0;
  width: 1000px;
}
</style>