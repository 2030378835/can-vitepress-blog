<!-- 圆形进度条 -->
<template>
  <div class="circular-progress-bar">
    
    <svg class="progress-ring" width="120" height="120">
      <!-- 底色圆 -->
      <circle
        class="progress-ring__background"
        stroke="#ffffff68"
        stroke-width="5"
        fill="transparent"
        r="52"
        cx="60"
        cy="60"
      />
      <!-- 进度圆 -->
      <circle
        class="progress-ring__circle"
        stroke="white"
        stroke-width="5"
        fill="transparent"
        r="52"
        cx="60"
        cy="60"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
      />
    </svg>
    <div class="progress-ring__play">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100
  }
})

const circumference = 2 * Math.PI * 52
const offset = computed(() => circumference - (props.percentage / 100) * circumference)
</script>

<style scoped>
.circular-progress-bar {
  position: relative;
  width: 120px;
  height: 120px;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring__background {
  transition: stroke-dashoffset 0.35s;
  transform: translateZ(0);
}

.progress-ring__circle {
  transition: stroke-dashoffset 0.35s;
  transform: translateZ(0);
  stroke-dasharray: v-bind('circumference');
  stroke-dashoffset: v-bind('offset');
}

.percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.progress-ring__play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  color: #ffffff68;
}
</style>