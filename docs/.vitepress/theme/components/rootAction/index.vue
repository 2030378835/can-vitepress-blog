<template>
  <div v-if="isShow" ref="rootAction" class="root-action-bg">
    <div :style="d.style" class="root-action">
      <div class="root-action-content">
        <span class="root-action-title">{{ d.title }}</span>
        <span v-if="!d.link" class="root-action-desc">{{ d.desc }}</span>
        <span v-else class="root-action-desc">
          <a :href="d.link" target="_blank">{{ d.desc }}</a>
        </span>
      </div> 
      <Button v-if="d.closable" @click="close" class="root-action-close" :icon="h(CloseOutlined)"></Button>
    </div>
    <div v-if="props.actions.length > 1" class="root-action-icon" style="display: flex;">
      <Button @click="next" class="root-action-icon-up btn" :icon="h(CaretUpOutlined)"></Button>
      <Button @click="prev" class="root-action-icon-down btn" :icon="h(CaretDownOutlined)"></Button>
    </div>
  </div>
</template>
<script setup>
import { ref, h, defineProps, computed } from 'vue';
import { CloseOutlined, CaretUpOutlined , CaretDownOutlined } from '@ant-design/icons-vue';
import { Button } from 'ant-design-vue';


const props = defineProps({
  actions: {
    type: Array,
    default: () => ([{
      title: 'HELLO WORLD',
      desc: '这里是描述',
      link: '',
      closable: true,
      style: {}
    }])
  }
})

const d = computed(() => {
  return props.actions[activeIndex.value]
})

const isShow = ref(true);

const rootAction = ref(null);

const activeIndex = ref( Math.floor(Math.random() * props.actions.length));

const close = () => {
  isShow.value = false
}
const next = () => {
  if (activeIndex.value === props.actions.length - 1) {
    activeIndex.value = 0
    return
  }
  activeIndex.value = activeIndex.value + 1
}
const prev = () => {
  if (activeIndex.value === 0) {
    activeIndex.value = props.actions.length - 1
    return
  }
  activeIndex.value = activeIndex.value - 1
}

</script>

<style lang="scss" scoped>
.root-action-bg {
  height: 52px;
  overflow: hidden;
  display: flex;
  background: var(--root-action-bg-color);
}
.root-action {
  // background: green;
  // 背景颜色蓝紫渐变左右
  margin-left: 60px;
  flex:1;
  display: flex;
  align-items: center;
  padding: 10px 80px;
  justify-content: space-between;
  // z-index: 9999;
  pointer-events: auto;
  height: 52px;
  .root-action-close {
    background: transparent;
    color: #fff;
    border-color: transparent;
    cursor: pointer;
    transform: scale(0.8);
  }
  .root-action-close:hover {
    background: transparent;
    color: #fff;
    border-color: rgb(255, 255, 255);
  }
  .root-action-content {
    .root-action-title {
      color: #fff;
      font-size: 16px;
      font-weight: 500;
    }
    .root-action-desc {
      color: #fff;
      font-size: 16px;
      margin-left: 4px;
      a {
        // 有下划线
        text-decoration: underline;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
}
.root-action-icon {
  pointer-events: auto;
  display: flex;
  align-items: center;
  margin-right: 20px;
  .btn {
    background: transparent;
    color: #fff;
    border-color: transparent;
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4px;
  }
  .btn:hover {
    background: transparent;
    color: #fff;
    border-color: rgb(255, 255, 255);
  }
}
</style>