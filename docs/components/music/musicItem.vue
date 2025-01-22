<template>
  <Card
    :hoverable="true"
    style="
      background: var(--vp-c-bg-soft); 
      border: none;
      width: 400px;
      height: 120px;
      margin-bottom: 20px;
    "
    class="music-item"
  >
    <div 
      class="img" 
      :style="getBg(props.index,  props.data)"
      alt="封面"
      @click="play(props.index)"
    >
      <i class="iconfont icon-bofang1" alt=""/>
    </div>
    <div class="index">
      {{ props.index + 1 }}
    </div>
    <div class="info">
      <div>{{ props.data.msg[0] }}</div>
      <div>歌手： {{ props.data.singger }}</div>
    </div>
  </Card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { Card } from 'ant-design-vue'
import '../../public/icon/iconfont.css'

import defaultConfigES from '../../../vitepress.config.ES'


const props = defineProps(['data', 'index'])
const emit = defineEmits(['play'])

const play = (index) => {
  emit('play', index)
}
const getBg = (index, item) => {
  return {
    background: item.desktop ? `url('${item.desktop}') center /cover` : `url('${defaultConfigES.base}/desktop/${index}.jpg')  center /cover`
  }
}
</script>

<style lang="scss" scoped>
div {
  color: var(--vp-c-text-1);
}
.music-item {
  .img {
    height: 96px;
    width: 96px;
    border-radius: 4px;
    background-size: 200%;
    background-repeat: no-repeat;
    background-position: center;
    object-fit:cover;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    i {
      height: 36px;
      width: 36px;
      opacity: 0.9;
      background: rgba(206, 206, 206, 0.491);
      border-radius: 50%;
      padding: 10px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
  }
  .index, .info {
    display: flex;
    align-items: center;
  }
  .index {
    font-size: 24px;
    width: 36px;
    justify-content: center;
  }
  .info {
    flex-direction: column;
    justify-content: center;
    >div {
      width: 100%;
      margin-top: 5px;
    }
    >div:nth-child(1) {
      font-size: 20px;
      font-weight: bold;
      font-weight: 600;
      white-space: nowrap; /* 防止文本换行 */
      overflow: hidden; /* 隐藏溢出的文本 */
      text-overflow: ellipsis; /* 显示省略号 */
      max-width: 200px;

    }
    >div:nth-child(2) {
      font-size: 14px;
      color: var(--vp-c-text-3);
    }
  }
}
:deep(.ant-card-body) {
  padding: 12px !important;
  display: flex;
}
</style>