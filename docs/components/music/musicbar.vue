<!-- 音乐操作条 -->
<template>
  <div 
    class="music-bar"
    v-if="props?.data" 
   >
    <!-- 时间轴 -->
    <Slider
      class="time-line"
      :min="0"
      :max="duration"
      v-model:value="currentTime"
      @change="handleChange"
      :tip-formatter="formatter"
    />
     <!-- 音乐图片 -->
    <div 
      @click="openModal"
      class="music-img"
      :style="getBg(props.current, props.data)"
    >
      
    </div>
    <!-- 音乐信息 -->
    <div class="singger-info">
      <div class="music-name">
        {{ props?.data?.msg[0] }}
      </div>
      <div class="music-time">{{ formattedDuration }} / {{ formattedCurrentTime }}</div>
    </div>
    <!-- 音乐播放 -->
    <div class="music-play">
      <audio style="display: none;" ref="audioPlayer" controls @timeupdate="updateCurrentTime">
        <source :src="props?.data?.url? props?.data?.url: defaultConfigES.base+'/music/'+props?.data?.name+'.mp3'" type="audio/mpeg">
        您的浏览器不支持 audio 元素。
      </audio>
    </div>
    <!-- 音乐控制 -->
    <div class="music-info">
      <div class="ctrl">
        <div v-if="showCtrl" class="pre" @click="pre">
          <i class="iconfont icon-shangyishou"/>
        </div>
        <div>
          <i 
            :class="['play-stop' ,'iconfont', `${!isPlaying ? 'icon-bofang1' : 'icon-zanting'}`]" 
            @click="play" 
          />
        </div>
        <div v-if="showCtrl" class="next" @click="next">
          <i class="iconfont icon-xiayishou" />        
        </div>          
      </div>
    </div>
    <!-- 其他控制 -->
    <div class="other-ctrl">
      <Tooltip color="var(--vp-c-bg-soft)" trigger="click">
        <template #title>
          <div class="volume-ctrl">
            <Slider 
              :step="0.01" 
              @change="changeVoice" 
              :max="1" 
              :min="0" 
              v-model:value="volume" 
              style="height: 100px;width: 4px;" 
              vertical
            />
            <div style="color: var(--vp-c-text-3);font-size: 12px;margin: 8px;">
              {{Math.ceil(volume * 100) + '%'}}
            </div>
            <div class="icon" @click="noVoice">
              <i :class="['iconfont',`${volume ? 'icon-yinliang': 'icon-jingyin'}`]" alt="" />
            </div>
          </div>
        </template>
        <div class="icon">
          <i :class="['iconfont',`${volume ? 'icon-yinliang': 'icon-jingyin'}`]" alt="" />
        </div>
      </Tooltip>
    </div>
  </div>
  <Modal
    :footer="null"
    v-model:open="open"
    width="100vw"
    style="
      max-width: 100vw;
      top:0px;
      border-radius: 0px;
      max-height: 100vh;
      overflow: hidden;
    "
    id="music-modal"
  >
    <div style="height: calc(100vh - 40px);">
      <MusicMsg :currentTime1="currentTime" :musicMsg="props.data.msg"/>
    </div>
  </Modal>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits, watch } from 'vue'
import { Slider, Tooltip, message, Modal } from 'ant-design-vue'
import MusicMsg from './musicMsg.vue'
import 'animate.css';
import '../../public/icon/iconfont.css'

import defaultConfigES from '../../../vitepress.config.ES.ts'

const emits = defineEmits(['pre', 'next'])
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  current: {
    type: Number,
    default: 0,
  }
})

const audioPlayer = ref(null)
const duration = ref(0)
const currentTime = ref(0)
const isPlaying = ref(false)
const savedTime = ref(0)
const msg = ref('')
const showCtrl = ref(true)
const volume = ref(0.5)
const open = ref(false)

onMounted(() => {
  const audio = audioPlayer.value
  audio.addEventListener('loadedmetadata', () => {
    duration.value = audio.duration
  })
  volume.value = audio.volume
})

const getBg = (index, item) => {
  return {
    background: item.desktop ? `url('${item.desktop}') center /cover` : `url('/desktop/${index}.jpg')  center /cover`
  }
}

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
    message.error('播放失败，已为您切换下一首歌曲');
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
  const currentSecond = Math.ceil(currentTime.value)
  msg.value = props?.data?.msg[currentSecond] ? props?.data?.msg[currentSecond] : msg.value
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

const changeVoice = (n) => {
  volume.value = n
  // 音量大小调节
  const audio = audioPlayer.value
  audio.volume = n
}

const noVoice = () => {
  volume.value = volume.value ? 0 : 0.5
  changeVoice(volume.value)
}

const pre = () => {
  emits('pre')
}
const next = () => {
  emits('next')
}

watch(() => props.current, (newVal) => {
  // 当 current 改变时切换音乐
  const audio = audioPlayer.value

  // 重置当前时间
  currentTime.value = 0
  savedTime.value = 0

  // 重置播放状态
  isPlaying.value = false

  // 重新设置音频源
  audio.src = props.data.url ? props.data.url : `/music/${props.data?.name}.mp3`
  audio.load()

  // 重新添加事件监听器
  audio.addEventListener('loadedmetadata', () => {
    duration.value = audio.duration
  })

  // 播放音频
  playAudio()
})

const handleChange = () => {
  const audio = audioPlayer.value
  audio.currentTime = currentTime.value
  savedTime.value = audio.currentTime
  // playAudio()
}

const openModal = () => {
  open.value = true
}
</script>

<style lang="scss" scoped>
.music-bar {
  height: 100px;
  position: fixed;
  bottom: 0px;
  width: 100vw;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  padding: 0 10px;
  z-index: 9999;
  // 上面加上阴影
  box-shadow: 0 2px 4px rgba(95, 94, 94, 0.73);
  .time-line {
    position: absolute;
    top: -3px;
    left: 0;
    width: 100vw;
  }
  .music-img {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
.music-play {
  width: 200px !important;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.music-info {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  top: 50%;
  .ctrl {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 240px;
    div:nth-child(2) {
      background-color: var(--vp-c-brand-1);
      border-radius: 50%;
      padding: 8px 8px 8px 8px;
      text-align: center;
      i {
        color: #ffffff;
      }
      height: 40px;
      width: 40px;
    }
    i:nth-child(3) {
      font-size: 20px;
      cursor: pointer;
      color: var(--vp-c-brand-1);
    }
    i:nth-child(1) {
      font-size: 20px;
      cursor: pointer;
      color: var(--vp-c-brand-1);

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
  background-color: var(--vp-c-bg);
}
:deep(.time-line  .ant-slider-rail) {
  background-color: transparent;
}
:deep(.ant-slider .ant-slider-track) {
  background-color: var(--vp-c-brand-1);
  border-radius: 0px !important;
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
.ant-slider {
  box-sizing: border-box;
  padding: 0;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  position: relative;
  height: 10px;
  cursor: pointer;
  touch-action: none;
  margin: 0px !important;
}
:where(.css-dev-only-do-not-override-1p3hq3p).ant-slider-horizontal {
  padding-block: 0px !important;
  height: 12px;
}
:deep(.ant-slider-handle) {
  display: none !important;
}
.singger-info {
  margin: 16px;
  .music-name {
    font-size: 20px;
    white-space: nowrap; /* 防止文本换行 */
    overflow: hidden; /* 隐藏溢出的文本 */
    text-overflow: ellipsis; /* 显示省略号 */
    max-width: 200px;
  }
  .music-time {
    font-size: 14px;
    color: var(--vp-c-text-3);
    margin-top: 4px;
  }
}
.other-ctrl {
  position: absolute;
  right: 50px;
  .icon {
    cursor: pointer;
    i {
      color: var(--vp-c-text-3);
    }
  }

}
.volume-ctrl {
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 10px;
  .icon {
    cursor: pointer;
    i {
      color: var(--vp-c-text-3);
    }
  }
}

/* 提高选择器优先级 */
#music-modal .ant-modal-content {
  background-color: aqua !important;
}
</style>