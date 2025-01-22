<template>
  <div ref="lyricsRef" class="lyrics-wrapper">
    <div class="lyrics-container">
      <p
        v-for="(line, index) in lyricsArray"
        :key="index"
        :class="{ 'active': isHighlighted(index) }"
        class="lyric-line"
      >{{ line }}</p>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, defineProps, nextTick } from 'vue';
  const props = defineProps(['currentTime1','musicMsg'])

  // 获取歌词区域DOM引用
  const lyricsRef = ref(null);
  const lyricsObj = computed(() => props.musicMsg);
  // 存储歌词文本内容的数组
  const lyricsArray = ref([]);
  // 记录组件渲染开始时间
  const currentTime = computed(() => Math.floor(props.currentTime1));
  // 记录高亮次数
  const highlightCount = ref(0);
  // 记录滚动的距离
  const scrollTop = ref(0);

  // 提取歌词文本内容到数组中（过滤掉非歌词的信息行）
  for (const key in lyricsObj.value) {
    if (key >= 0) {
      lyricsArray.value.push(lyricsObj.value[key]);
    }
  }
  // 判断歌词行是否高亮的函数
  const isHighlighted = (index) => {
    const lineStartTime = getLineStartTime(index);
    return currentTime.value >= lineStartTime && currentTime.value < getNextLineStartTime(index);
  };

  // 获取某一行歌词开始时间的函数（这里简单按照歌词顺序平均分配时间间隔示例，实际需按歌曲真实时间）
  const getLineStartTime = (index) => {
    return Object.keys(lyricsObj.value)[index]
  };

  // 获取下一行歌词开始时间的函数
  const getNextLineStartTime = (index) => {
    return getLineStartTime(index + 1);
  };

  const up = () => {
    const moveStep = 30; // 每次向上移动的像素值，可根据需求调整
    if (lyricsRef.value && highlightCount.value > 8) {
      scrollTop.value = scrollTop.value + moveStep;
      lyricsRef.value.scrollTop = scrollTop.value;
    }
  }

  watch(currentTime, (newVal, oldVal) => {
    if (lyricsObj.value[newVal]) {
      newVal > oldVal ? highlightCount.value++ : highlightCount.value--
      nextTick(() => {
        // 向上移动歌词，放在nextTick回调中确保DOM更新后操作
        up()
      });
    }
  });
  watch(lyricsObj, (newVal) => {
    lyricsArray.value = [];
      // 提取歌词文本内容到数组中（过滤掉非歌词的信息行）
    for (const key in newVal) {
      if (key >= 0) {
        lyricsArray.value.push(newVal[key]);
      }
    }
  })
</script>

<style scoped>
.lyrics-wrapper {
  height: 500px; /* 根据实际需求调整高度 */
  overflow: scroll;
  transition:  300ms;
  scroll-behavior: smooth; 
  /* transition: scroll-top 0.5s ease; */
  position: relative;
  /* 剧中 */
  left: 50%;
  transform: translate(-50%, -30%);
  top:30%;
}
.lyric-line {
  /* margin: 5px 0; */
  transition:  300ms;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);

}
.lyrics-container {
  transition: 300ms;
}
.active {
  /* background-color: yellow; 高亮的背景颜色，可按需更改 */
  font-size: large;
  color: var(--vp-c-text-1);
}
</style>