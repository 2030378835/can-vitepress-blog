<template>
  <div class="box-of-swiper">
    <Carousel
      effect="fade"
      :after-change="onChange"
      ref="varousel"
    >
      <div v-for="(item, index) in musicData.slice(0,3)" :key="index" class="swiper">
        <div class="swiper-content" :style="getBg(index, item)">
          <MusicPlays :currentMusic="{
            currentIndex: currentIndex,
            index: index,
          }" @pre="pre" @next="next" style="z-index: 2; transform: scale(0.8); margin-top: 100px;" :data="item"/>
        </div>
      </div>
    </Carousel>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { Carousel } from 'ant-design-vue'
import musicData from '../../public/music/config'
import MusicPlays from '../music/musicPlays.vue';

const varousel = ref(null)
const currentIndex = ref(0)
const onChange = (current) => {
  currentIndex.value = current
  console.log(currentIndex.value);
};
const pre = () => {
  varousel.value.prev()
}
const next = () => {
  varousel.value.next()    
}
const getBg = (index, item) => {
  return {
    background: item.desktop ? `url('${item.desktop}') center /cover` : `url('/desktop/${index}.jpg')  center /cover`
  }
}
</script>
<style scoped>
/* For demo */
.swiper {
  height: calc(100% - 64px);
  width: 100%;
  min-height: 340px;
  div {
    width: 100%;
  }
}
.swiper-content {
  width: 100% !important;
  height: 100%;
  min-height: 340px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.box-of-swiper {
  width: 100%;
}
</style>