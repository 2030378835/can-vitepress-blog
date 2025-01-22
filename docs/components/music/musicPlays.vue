<template>
  <div v-if="props?.data" 
    @mouseenter="ok()"
    @mouseleave="no()"
    style="
      display: flex; 
      align-items: center;
      justify-content: center;
      flex-direction: column;
      transform: scale(1.5);
    ">
    <div class="music-play">
      <audio style="display: none;" ref="audioPlayer" controls @timeupdate="updateCurrentTime">
        <source :src="props.data.url ? props.data.url : '/music/'+props?.data?.name+'.mp3'" type="audio/mpeg">
        <!-- <source src="https://lv-sycdn.kuwo.cn/fa0d0dd15ee62e70b2d6388ccbddea25/67700dfd/resource/30106/trackmedia/M500003bCi0U3h3Nql.mp3?bitrate$128&from=vip" type="audio/mpeg" /> -->
        您的浏览器不支持 audio 元素。
      </audio>
      <CircularProgressBar :percentage="percentage">
        <i 
          :class="['play-stop' ,'iconfont', `${!isPlaying ? 'icon-bofang1' : 'icon-zanting'}`]" 
          @click="play" 
        />
      </CircularProgressBar>
    </div>
    <div class="music-info">
      <div class="music-name">{{ props?.data?.name }} - {{ props?.data?.singger }}</div>
      <div class="music-ci">{{ currentMsg }}</div>
        <div class="ctrl">
          <Transition 
            leave-active-class="animate__animated animate__fadeOutLeft" 
            enter-active-class="animate__animated animate__fadeInLeft"
            mode="out-in"
          >
            <div v-if="showCtrl" class="pre" @click="pre">
              <span class="iconfont icon-shangyishou"/>
              上一首
            </div>
          </Transition>
          <Transition
            leave-active-class="animate__animated animate__fadeOutRight"
            enter-active-class="animate__animated animate__fadeInRight"
            mode="out-in"
          >
              <div v-if="showCtrl" class="next" @click="next">
              下一首
              <span class="iconfont icon-xiayishou" />
            </div>          
          </Transition>
        </div>
      <div class="time">
        <span>{{ formattedDuration }}</span>
        <Slider
          style="width: 300px;margin: 20px;"
          :min="0"
          :max="duration"
          v-model:value="currentTime"
          @change="handleChange"
          :tip-formatter="formatter"
        />
        <span>{{ formattedCurrentTime }}</span>
      </div>
    </div>
  </div>
</template>

<link rel="stylesheet" href="../public/icon/iconfont.css" />
<script setup>
import { ref, onMounted, computed, defineEmits, watch } from 'vue'
import { Slider, message } from 'ant-design-vue'
import CircularProgressBar from './circularProgressBar.vue'
import 'animate.css';
import '../../public/icon/iconfont.css'
const emits = defineEmits(['pre', 'next'])
const props = defineProps({
  data:{
    type: Object,
    default: () => ({})
  },
  currentMusic: {
    type: Object,
    default: () => ({
      currentIndex: 0,
      index: 0,
    })
  }
})

const audioPlayer = ref(null)
const duration = ref(0)
const currentTime = ref(0)
const isPlaying = ref(false)

const savedTime = ref(0)

const msg = ref('')
const showCtrl = ref(false)

onMounted(() => {
  const audio = audioPlayer.value
  audio.addEventListener('loadedmetadata', () => {
    duration.value = audio.duration
  })
})

const play = () => {
  if (isPlaying.value) {
    pauseAudio()
  } else {
    playAudio()
  }
}

const playAudio = () => {
  const audio = audioPlayer.value
  audio.currentTime = savedTime.value
  audio.play().then(() => {
    console.log('播放成功')
  }).catch((error) => {
    console.log('播放失败', error)
    message.error('播放失败，已为您播放下一首歌曲')
    emits('next')
  })
  isPlaying.value = true
}

const pauseAudio = () => {
  const audio = audioPlayer.value
  savedTime.value = audio.currentTime
  audio.pause()
  isPlaying.value = false
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

const formattedDuration = computed(() => formatTime(duration.value))
const formattedCurrentTime = computed(() => formatTime(currentTime.value))
const formatter = (value) => {
  return formatTime(value);
};
const currentMsg = computed(() => {
  const currentSceond = Math.ceil(currentTime.value)
  msg.value = props?.data?.msg[currentSceond] ? props?.data?.msg[currentSceond] : msg.value
  return msg.value
})

const percentage = computed(() => {
  return (currentTime.value / duration.value) * 100
})

const updateCurrentTime = () => {
  const audio = audioPlayer.value
  currentTime.value = audio.currentTime
  if (currentTime.value >= duration.value) {
    pauseAudio()
  }
}

const pre = () => {
  emits('pre')
}
const next = () => {
  emits('next')
}
watch(() => props.currentMusic, (newVal) => {
  const { index, currentIndex } = newVal
  if (index !== currentIndex) {
    pauseAudio()
    savedTime.value = 0 // 重置保存的播放时间
  } else {
    playAudio()
  }
})
const ok = () => {
  showCtrl.value = true
}
const no = () => {
  showCtrl.value = false
}

const handleChange = () => {
  const audio = audioPlayer.value
  audio.currentTime = currentTime.value
}
</script>

<style lang="scss" scoped>
.music-play {
  width: 200px !important;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .play-stop {
    font-size: 80px;
    color: #fff;
  }
}
.music-info {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .music-name {
    font-size: 16px;
    color: aliceblue;
  }
  .music-ci {
    font-size: 20px;
    color: aliceblue;
    letter-spacing: 1px;
  }
  .ctrl {
    display: flex;
    position: absolute;
    top: 40px;
    z-index: -1;
    transition: all 0.5s ease-in-out;
    div {
      width: 200px;
      display: flex;
      align-items: center;
      font-size: 20px;
      color: aliceblue;
      cursor: pointer;
    }
    div:nth-child(1) {
      justify-content: flex-start;
    }
    div:nth-child(2) {
      justify-content: flex-end;
    }
    span {
      font-size: 30px;
    }
  }
  .time {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 12px;
      display: flex;
      align-items: center;
      width: 34px;
      text-align: center;
      color: aliceblue;
    }
  }
}

:deep( .ant-slider-rail ) {
  // background-color: #e5e5e5b5;
  // 毛边玻璃效果
  background: linear-gradient(to right, rgba(198, 95, 232, 0.748) 0%, rgba(191, 43, 250, 0.844) 10%, transparent 100%, transparent 100%);
}
:deep(.ant-slider .ant-slider-track) {
  background-color: #fff;
}

:deep(.ant-slider-handle::after) {
    content: "";
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    box-shadow: 0 0 0 2px #dfdfdf;
    border-radius: 50%;
    cursor: pointer;
    transition: inset-inline-start 0.2s, inset-block-start 0.2s, width 0.2s, height 0.2s, box-shadow 0.2s;
}
:deep(.ant-slider-handle:focus:after) {
    content: "";
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    box-shadow: 0 0 0 2px #dfdfdf;
    border-radius: 50%;
    cursor: pointer;
    transition: inset-inline-start 0.2s, inset-block-start 0.2s, width 0.2s, height 0.2s, box-shadow 0.2s;
}
</style>