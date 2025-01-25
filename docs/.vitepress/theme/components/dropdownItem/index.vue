<template>
  <div class="dropdownItem" :style="props.config.style">
    <Badge>
      <div 
        :style="{color: active || isActive ? 'var(--vp-c-brand-1)': ''}" 
        :class="[
          props.config.isTab ? 'title' : 'text', 
          props.config.isLink ? 'vp-external-link-icon':null
        ]" 
        @click="goToLink"
        target="_blank"
      >
        {{ props.config.title  }}
        <span class="newTag" v-if="props.config.isNew">
          NEW
        </span>
        <span v-if="props.config.isTab" class="vpi-chevron-down text-icon"></span>
      </div>
    </Badge>
  </div>

</template>
<script setup>
import { defineProps, computed } from 'vue';
import { useRouter, withBase, useRoute } from 'vitepress'
import { Badge } from 'ant-design-vue';
import '../../../../public/icon/iconfont.css'

const router = useRouter()
const route = useRoute()

const active = computed(() => {
 return route.path.indexOf(props.config.path) > -1 ? true : false
})

const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      isNew: false,
      isLink: false,
      title: '',
      link: '',
      path: '',
      style: {},
      isTab: false
    })
  },
  isActive: {
    type: Boolean,
    default: false
  }
})


const goToLink = () => {
  if (props.config.path) {
    console.log(withBase(props.config.path), route.path)
    // window.open(props.config.link, '_blank')
    router.go(withBase(props.config.path))
  }
  if (props.config.link) {
    window.open(props.config.link, '_blank')
  }
}
</script>

<style scoped lang="scss">
.dropdownItem {
  cursor: pointer;
  border-radius: 8px;
  transition: 300ms;
  font-family: var(--vp-font-family-base);
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0 12px;
  // border: 1px solid red;
  .text, .title {
    transition: 300ms;
    color: var(--vp-c-text-1);
    display: flex;
    align-items: center;
    padding: 10px 0;
    .icon-wailianjiantou {
      font-size: 7px;
      font-weight: 400;
    }
    .onlyLink {
      color: #a5a5a5;
    }
  }
}
.dropdownItem:hover {
  background-color: var(--dropdown-bg-hover-colot);
}
.dropdownItem:hover .text {
  color: var(--vp-c-brand-1);
}
.dropdownItem:hover .title {
  opacity: 0.8;
}
.icon-iconfontzhizuobiaozhun023147 {
  color: red;
  background-color: #fff;
  border-radius: 60%;
  transform: scale(0.8);
}
.newTag {
  font-size: 8px;
  border-radius: 6px;
  background-color: var(--vp-c-brand-1);
  padding: 4px;
  color: #fff;
  margin-left: 4px;
  font-weight: bolder;
  transform: scale(0.8);
}
</style>

